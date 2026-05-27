'use server';

import { createClient } from '@/supabase/server';
import { ADMIN } from '@/constants/constants';
import { revalidatePath } from 'next/cache';

export const authenticate = async (email: string, password: string) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  } catch (error) {
    console.log('AUTHENTICATION ERROR', error);
    throw error;
  }
};

export const adminSignIn = async (email: string, password: string) => {
  const supabase = await createClient();
  try {
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) return { error: signInError.message };

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('type')
      .eq('id', user?.id)
      .single();

    if (userError) {
      console.log('Error fetching user data during admin sign-in:', userError);
      await supabase.auth.signOut();
      return { error: 'Access denied: User record not found or error fetching data.' };
    }

    if (userData?.type?.toUpperCase() !== ADMIN) {
      console.log(`Access denied: User ${user?.email} is not an admin. Type: ${userData?.type}`);
      await supabase.auth.signOut();
      return { error: 'Access denied: You are not authorized as an admin.' };
    }

    revalidatePath('/admin/dashboard');
    return { error: null };
  } catch (error: any) {
    console.log('ADMIN AUTHENTICATION ERROR', error);
    return { error: error.message };
  }
};

export const adminSignUp = async (email: string, password: string) => {
  const supabase = await createClient();
  try {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) return { error: signUpError.message };

    if (user) {
        // Use upsert to handle cases where the user record might or might not exist yet
        const { error: upsertError } = await supabase
          .from('users')
          .upsert({ 
            id: user.id, 
            email: email, 
            type: ADMIN,
            avatar_url: '' // Default empty avatar
          }, { onConflict: 'id' });
        
        if (upsertError) {
            console.warn('Could not automatically set user type to admin during signup:', upsertError.message);
        }
    }

    return { error: null };
  } catch (error: any) {
    console.log('ADMIN SIGN UP ERROR', error);
    return { error: error.message };
  }
}

export const getLatestUsers = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw new Error(`Error fetching latest users: ${error.message}`);

  return data.map(
    (user: { id: string; email: string; created_at: string | null }) => ({
      id: user.id,
      email: user.email,
      date: user.created_at,
    })
  );
};
