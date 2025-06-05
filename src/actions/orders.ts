'use server';

import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendNotification } from './notifications';

export const getOrdersWithProducts = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('order')
    .select('*, order_items:order_item(*, product(*)), user(*)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const updateOrderItemStatus = async (orderItemId: number, status: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from('order_item')
    .update({ status })
    .eq('id', orderItemId);

  if (error) throw new Error(error.message);
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from('order')
    .update({ status })
    .eq('id', orderId);

  if (error) throw new Error(error.message);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) throw new Error("User not logged in");
  const userId = session.user.id;

  await sendNotification(userId, status + ' 🚀');

  revalidatePath('/admin/orders');
};

/**
 * Update order financials including total price, refunded amount,
 * and increment the user's wallet_balance by refunded_amount.
 */
export const updateFinancials = async (
  orderId: number,
  newTotalPrice: number,
  newRefundedAmount: number
) => {
  const supabase = await createClient();

  // Step 1: Get current order data
  const { data: currentOrder, error: orderFetchError } = await supabase
    .from('order')
    .select('user, refunded_amount')
    .eq('id', orderId)
    .single();

  if (orderFetchError) throw new Error(orderFetchError.message);

  const userId = currentOrder.user;
  const oldRefundedAmount = currentOrder.refunded_amount || 0;
  const refundDifference = newRefundedAmount - oldRefundedAmount;

  // Step 2: Update order with new totals
  const { error: orderUpdateError } = await supabase
    .from('order')
    .update({ totalPrice: newTotalPrice, refunded_amount: newRefundedAmount })
    .eq('id', orderId);

  if (orderUpdateError) throw new Error(orderUpdateError.message);

  // Step 3: Fetch current wallet balance
  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('wallet_balance')
    .eq('user_id', userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  const currentBalance = profileData?.wallet_balance || 0;
  const newBalance = currentBalance + refundDifference;

  // Step 4: Update wallet balance
  const { error: walletUpdateError } = await supabase
    .from('profile')
    .update({ wallet_balance: newBalance })
    .eq('user_id', userId);

  if (walletUpdateError) throw new Error(walletUpdateError.message);
};

export const getMonthlyOrders = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('order').select('created_at');

  if (error) throw new Error(error.message);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
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
};
