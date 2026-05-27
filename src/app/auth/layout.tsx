
import { ADMIN } from '@/constants/constants';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function AuthLayout({
    children,
}: Readonly<{
    children: ReactNode;

}>) {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError && authError.message !== 'Auth session missing!') {
        console.error('Auth error in layout:', authError.message);
    }

    if(authData?.user) {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

        if(error || !data){
            console.log('Error fetching user data',error);
            return;
        }

        if(data.type?.toUpperCase() === ADMIN) return redirect('/admin');
    }

 return <>  {children} </>
    
}