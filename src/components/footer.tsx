import Link from 'next/link';

export const Footer = () => (
  <footer className='bg-zinc-950 h-auto py-6 border-t border-zinc-800 text-zinc-400'>
    <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-4'>
      <Link href='/' className='text-lg font-bold text-white tracking-tight' prefetch={false}>
        eShop
      </Link>
      <nav className='flex items-center flex-wrap gap-4 text-sm'>
        <Link href='/About' className='hover:text-emerald-400 transition-colors' prefetch={false}>
          About
        </Link>
        <Link href='/Policy' className='hover:text-emerald-400 transition-colors' prefetch={false}>
          Privacy Policy
        </Link>
        <Link href='/TermsAndCondition' className='hover:text-emerald-400 transition-colors' prefetch={false}>
          Terms of Service
        </Link>
        <Link href='/RefundPolicy' className='hover:text-emerald-400 transition-colors' prefetch={false}>
          Refund & Delivery Policy
        </Link>
      </nav>
      <p className='text-xs text-zinc-500'>
        © {new Date().getFullYear()} eShop (Proudchitts Inc.)
      </p>
    </div>
  </footer>
);
