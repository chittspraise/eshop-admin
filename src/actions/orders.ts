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
  totalPrice: number,
  refunded_amount: number
) => {
  const supabase = await createClient();

  // Update order totalPrice and refunded_amount
  const { error: orderError } = await supabase
    .from('order')
    .update({ totalPrice, refunded_amount })
    .eq('id', orderId);

  if (orderError) throw new Error(orderError.message);

  // Get user from order to update their wallet_balance
  const { data: orderData, error: orderDataError } = await supabase
    .from('order')
    .select('user')
    .eq('id', orderId)
    .single();

  if (orderDataError) throw new Error(orderDataError.message);
  const userId = orderData.user;

  // Get current wallet_balance from profile
  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('wallet_balance')
    .eq('user_id', userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  const currentBalance = profileData?.wallet_balance || 0;
  const newBalance = currentBalance + refunded_amount;

  // Update wallet_balance in profile table
  const { error: updateWalletError } = await supabase
    .from('profile')
    .update({ wallet_balance: newBalance })
    .eq('user_id', userId);

  if (updateWalletError) throw new Error(updateWalletError.message);
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
