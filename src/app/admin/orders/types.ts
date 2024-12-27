import { createClient } from '@/supabase/server';
import { QueryData } from '@supabase/supabase-js';

export async function getOrdersWithProductsQuery() {
  const supabase = await createClient();
  return supabase
    .from('order')
    .select('*, order_items:order_item(*, product(*)), user(*)')
    .order('created_at', { ascending: false });
}

export type OrdersWithProducts = QueryData<ReturnType<typeof getOrdersWithProductsQuery>>;