'use server';

import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendNotification } from './notifications';

interface Product {
  id: number;
  price: number;
}

interface OrderItem {
  product: Product;
}

// Fetch all orders with related products
export const getOrdersWithProducts = async () => {
  try {
    const supabase = await createClient(); // Added await

    const { data, error } = await supabase
      .from('order')
      .select('*, order_items:order_item(*, product(*)), user(*)')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Calculate refunded funds based on out-of-stock products
const calculateRefundedFunds = (orderItems: OrderItem[], outOfStockProductIds: Set<number>): number => {
  return orderItems.reduce((total, { product }) => {
    return outOfStockProductIds.has(product.id) ? total + product.price : total;
  }, 0);
};

// Update the totalPrice, refunded_amount, and status for a specific order
export const updateOrderTotal = async (
  orderId: number,
  orderItems: OrderItem[],
  outOfStockProductIds: Set<number>,
  status: string
) => {
  try {
    const supabase = await createClient(); // Added await

    const refundedFunds = calculateRefundedFunds(orderItems, outOfStockProductIds);
    const adjustedTotalPrice = orderItems.reduce((total, { product }) => {
      return total + (outOfStockProductIds.has(product.id) ? 0 : product.price);
    }, 0);

    console.log('Updating order:', { orderId, adjustedTotalPrice, refundedFunds, status });

    const { error } = await supabase
      .from('order')
      .update({
        totalPrice: adjustedTotalPrice,
        refunded_amount: refundedFunds,
        status: status,
      })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order:', error);
      throw new Error(error.message);
    }

    console.log('Order updated successfully:', { orderId, adjustedTotalPrice, refundedFunds, status });

    revalidatePath('/admin/orders');
  } catch (error) {
    console.error('Error updating order total:', error);
    throw error;
  }
};

// Update the status of a specific order
export const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    const supabase = await createClient(); // Added await

    const { error } = await supabase
      .from('order')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      throw new Error(error.message);
    }

    const { data: sessionData, error: authError } = await supabase.auth.getSession();

    if (authError || !sessionData.session?.user?.id) {
      throw new Error('User not authenticated');
    }

    const userId = sessionData.session.user.id;
    await sendNotification(userId, `${status} 🚀`);

    revalidatePath('/admin/orders');
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Wrapper function for client-side calls
export const updateOrderStatusWrapper = async (orderId: number, status: string) => {
  await updateOrderStatus(orderId, status);
};

// Fetch the number of orders per month
export const getMonthlyOrders = async () => {
  try {
    const supabase = await createClient(); // Added await

    const { data, error } = await supabase.from('order').select('created_at');

    if (error) throw new Error(error.message);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const ordersByMonth = data.reduce(
      (acc: Record<string, number>, order: { created_at: string }) => {
        const date = new Date(order.created_at);
        const month = monthNames[date.getUTCMonth()];

        if (!acc[month]) acc[month] = 0;
        acc[month]++;

        return acc;
      },
      {}
    );

    return Object.keys(ordersByMonth).map(month => ({
      name: month,
      orders: ordersByMonth[month],
    }));
  } catch (error) {
    console.error('Error fetching monthly orders:', error);
    throw error;
  }
};
