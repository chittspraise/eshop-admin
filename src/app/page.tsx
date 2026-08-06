'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Smartphone,
  ArrowRight,
  Users,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  CheckCircle,
  Clock,
  QrCode,
  ShoppingBag,
  Store,
  UserCheck,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

const MotionWrapper = ({ children, delay = 0, duration = 0.5 }: MotionWrapperProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const workflowSteps = [
  {
    step: '01',
    title: 'Places Order',
    actor: 'Buyer',
    description: 'Buyer places an order for themselves or someone else and selects the recipient\'s collection location using an address or map pin.',
    icon: ShoppingBag,
    color: 'from-emerald-500/20 to-green-500/5',
    iconColor: 'text-emerald-400',
    borderColor: 'group-hover:border-emerald-500/50',
  },
  {
    step: '02',
    title: 'Finds Nearby Shoppers',
    actor: 'System',
    description: 'eShop automatically locates registered shoppers or retail stores near the selected map pin/location coordinates.',
    icon: MapPin,
    color: 'from-blue-500/20 to-indigo-500/5',
    iconColor: 'text-blue-400',
    borderColor: 'group-hover:border-blue-500/50',
  },
  {
    step: '03',
    title: 'Dispatches via WhatsApp',
    actor: 'WhatsApp API',
    description: 'The order request is instantly pushed directly to nearby registered shoppers\' WhatsApp devices with item details.',
    icon: MessageCircle,
    color: 'from-green-500/20 to-emerald-500/5',
    iconColor: 'text-green-400',
    borderColor: 'group-hover:border-green-500/50',
  },
  {
    step: '04',
    title: 'Accepts Order',
    actor: 'Shopper',
    description: 'A registered shopper accepts the order request on their phone, immediately locking the order to their queue.',
    icon: UserCheck,
    color: 'from-purple-500/20 to-pink-500/5',
    iconColor: 'text-purple-400',
    borderColor: 'group-hover:border-purple-500/50',
  },
  {
    step: '05',
    title: 'Prepares Items',
    actor: 'Shopper / Store',
    description: 'The shopper physically prepares the items in-store, moving the live tracking state from Accepted → Preparing.',
    icon: Clock,
    color: 'from-amber-500/20 to-orange-500/5',
    iconColor: 'text-amber-400',
    borderColor: 'group-hover:border-amber-500/50',
  },
  {
    step: '06',
    title: 'Ready for Collection',
    actor: 'System Notification',
    description: 'The status is updated to "Ready for Collection", and notifications with a collection reference code are sent to the buyer and recipient.',
    icon: CheckCircle,
    color: 'from-cyan-500/20 to-blue-500/5',
    iconColor: 'text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/50',
  },
  {
    step: '07',
    title: 'Recipient Collects',
    actor: 'Recipient',
    description: 'The recipient visits the selected store to pick up the requested items using their secure order reference or code.',
    icon: QrCode,
    color: 'from-pink-500/20 to-rose-500/5',
    iconColor: 'text-pink-400',
    borderColor: 'group-hover:border-pink-500/50',
  },
];

const adminStats = [
  {
    title: 'Total Orders',
    value: '14,824',
    subtext: 'Lifetime transactions',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    title: 'Active Shoppers',
    value: '184',
    subtext: 'Nearby & online',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    title: 'Pending Orders',
    value: '12',
    subtext: 'Awaiting WhatsApp acceptance',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    title: 'Orders in Progress',
    value: '38',
    subtext: 'Being prepared right now',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    title: 'Ready for Collection',
    value: '24',
    subtext: 'Reference codes generated',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    title: 'Completed Orders',
    value: '14,566',
    subtext: 'Successfully collected',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Product Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    comment: 'The location-based coordination is stellar! I ordered a surprise package for my brother in another town, selected a local pin, and a registered shopper prepared it at a shop near his flat in minutes. He walked in, showed his collection code, and picked it up. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Registered Store Partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    comment: 'Receiving orders directly on WhatsApp has streamlined our retail business. We receive the request, accept it on eShop, prepare the items, and mark it ready. The receipt process via reference codes keeps the security absolutely airtight.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    comment: 'The visual administrator dashboard on eShop gives us perfect, granular control. We immediately see pending, in-progress, and ready-to-collect statuses. Location-based matching keeps logistics seamless without manual dispatching!',
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className='min-h-screen bg-black text-white selection:bg-[#1BC464]/30 selection:text-[#1BC464] overflow-x-hidden relative font-sans'>
      
      {/* Decorative Glowing Ambients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[45%] h-[45%] rounded-full bg-[#1BC464]/10 blur-[150px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Modern Translucent Navigation Bar */}
      <header className='sticky top-0 z-50 backdrop-blur-lg bg-black/60 border-b border-zinc-900/80 transition-all'>
        <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
          <Link href='/' className='flex items-center space-x-2 group'>
            <span className='text-2xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent group-hover:from-[#1BC464] group-hover:to-emerald-300 transition-all duration-300'>
              eShop<span className='text-[#1BC464] font-extrabold'>.</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-400">
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#admin-center" className="hover:text-white transition-colors duration-200">Admin Dashboard</a>
            <a href="#testimonials" className="hover:text-white transition-colors duration-200">Reviews</a>
            <Link href="/About" className="hover:text-white transition-colors duration-200">About</Link>
          </nav>

          <div className='flex items-center space-x-4'>
            <Link href='/admin' className='text-sm text-neutral-400 hover:text-white font-medium transition-colors hidden sm:inline-flex items-center space-x-1'>
              <LayoutDashboard className="w-4 h-4 mr-1 text-[#1BC464]" />
              <span>Dashboard</span>
            </Link>
            <Button
              size='sm'
              className='bg-[#1BC464] hover:bg-[#15a351] text-black font-semibold tracking-wide rounded-full px-5 py-2 shadow-[0_0_20px_rgba(27,196,100,0.2)] hover:shadow-[0_0_25px_rgba(27,196,100,0.4)] transition-all duration-300'
              onClick={() => window.location.href = '/auth'}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-6 relative z-10'>
        
        {/* HERO SECTION */}
        <section className='pt-12 pb-20 md:pt-20 md:pb-28'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
            
            {/* Left Info Column */}
            <div className='lg:col-span-7 flex flex-col justify-center text-left'>
              <MotionWrapper delay={0.1}>
                <Badge className="mb-6 bg-emerald-500/10 text-[#1BC464] border border-emerald-500/20 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-widest hover:bg-emerald-500/20 transition-colors">
                  📍 Location-Based Order Collection Platform
                </Badge>
              </MotionWrapper>
              
              <MotionWrapper delay={0.2}>
                <h2 className='text-4xl sm:text-6xl font-black leading-[1.1] mb-6 tracking-tight'>
                  Seamless Shopping 
                  <span className='block bg-gradient-to-r from-emerald-400 via-[#1BC464] to-teal-400 bg-clip-text text-transparent mt-2'>
                    Connected Locally.
                  </span>
                </h2>
              </MotionWrapper>
              
              <MotionWrapper delay={0.3}>
                <p className='text-neutral-400 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl'>
                  eShop links buyers, registered local shoppers, and recipients into a unified location-based pickup system. Pin your location, dispatch to nearby stores automatically via WhatsApp, and pick up securely in minutes.
                </p>
              </MotionWrapper>
              
              <MotionWrapper delay={0.4}>
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg'>
                  <Button size='lg' className='bg-[#1BC464] hover:bg-[#15a351] text-black font-semibold rounded-xl shadow-[0_0_30px_rgba(27,196,100,0.25)] hover:shadow-[0_0_35px_rgba(27,196,100,0.45)] transition-all duration-300 py-6 px-8 flex items-center justify-center space-x-2' onClick={() => window.location.href = '#how-it-works'}>
                    <span>Learn How It Works</span>
                    <ArrowRight className='h-5 w-5 ml-1' />
                  </Button>
                  
                  <Link href='/admin' className="flex items-center justify-center">
                    <Button size='lg' variant="outline" className='w-full border-neutral-800 hover:border-neutral-700 bg-zinc-950/40 text-neutral-200 hover:text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300 py-6 px-8'>
                      <LayoutDashboard className="w-5 h-5 mr-2 text-[#1BC464]" />
                      <span>Admin Control Center</span>
                    </Button>
                  </Link>
                </div>
              </MotionWrapper>
            </div>

            {/* Right Visual Column: Floating Collage */}
            <div className='lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0'>
              <div className='relative w-[320px] h-[520px] sm:w-[380px] sm:h-[580px] flex justify-center items-center'>
                
                {/* Visual Backdrop Radial Light */}
                <div className="absolute inset-0 bg-[#1BC464]/20 rounded-full blur-[80px] w-4/5 h-4/5 m-auto z-0" />
                
                {/* Floating Screenshot 1 (Left background) */}
                <motion.div
                  className="absolute left-[-30px] top-[40px] z-10 w-[180px] sm:w-[210px] aspect-[9/19] rounded-[2rem] overflow-hidden border-4 border-zinc-800 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  initial={{ opacity: 0, x: -50, rotate: -15 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: -12,
                    y: [0, -12, 0] 
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.2 },
                    x: { duration: 0.8, delay: 0.2 },
                    rotate: { duration: 0.8, delay: 0.2 },
                    y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30, rotate: -5, transition: { duration: 0.2 } }}
                >
                  <Image
                    src="/whatsapp-image-1.jpg"
                    alt="eShop Screenshot 1"
                    fill
                    className="object-cover"
                    sizes="210px"
                    priority
                  />
                </motion.div>

                {/* Floating Screenshot 2 (Center Foreground) */}
                <motion.div
                  className="absolute z-20 w-[200px] sm:w-[230px] aspect-[9/19] rounded-[2.5rem] overflow-hidden border-4 border-zinc-700 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.8 },
                    y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30, transition: { duration: 0.2 } }}
                >
                  <Image
                    src="/whatsapp-image-2.jpg"
                    alt="eShop Screenshot 2"
                    fill
                    className="object-cover"
                    sizes="230px"
                    priority
                  />
                  <Badge className='absolute top-4 right-4 bg-[#1bc464] text-black font-bold border-none hover:bg-[#1bc464] shadow-md shadow-emerald-950'>
                    Live Dispatch
                  </Badge>
                </motion.div>

                {/* Floating Screenshot 3 (Right background) */}
                <motion.div
                  className="absolute right-[-30px] top-[80px] z-10 w-[180px] sm:w-[210px] aspect-[9/19] rounded-[2rem] overflow-hidden border-4 border-zinc-800 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  initial={{ opacity: 0, x: 50, rotate: 15 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: 10,
                    y: [0, -15, 0] 
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.3 },
                    x: { duration: 0.8, delay: 0.3 },
                    rotate: { duration: 0.8, delay: 0.3 },
                    y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30, rotate: 3, transition: { duration: 0.2 } }}
                >
                  <Image
                    src="/whatsapp-image-3.jpg"
                    alt="eShop Screenshot 3"
                    fill
                    className="object-cover"
                    sizes="210px"
                    priority
                  />
                </motion.div>

              </div>
            </div>

          </div>
        </section>

        {/* CORE PLATFORM MODEL OVERVIEW */}
        <section className='py-16 border-t border-zinc-900/80 bg-zinc-950/20 backdrop-blur-sm rounded-[2.5rem] px-8 sm:px-12 my-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>
            
            <MotionWrapper delay={0.1}>
              <div className='p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 h-full hover:border-[#1BC464]/30 transition-all duration-300 flex flex-col justify-between'>
                <div>
                  <div className='p-3 rounded-2xl w-fit bg-[#1BC464]/10 border border-[#1BC464]/20 text-[#1BC464] mb-6'>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className='text-2xl font-bold mb-3 text-white'>1. The Buyer</h3>
                  <p className='text-neutral-400 text-sm leading-relaxed'>
                    Places order via mobile app. They can order for themselves or coordinate on behalf of family and friends. By selecting a precise map pin, they ensure the dispatcher matches with partners local to the recipient.
                  </p>
                </div>
                <div className='mt-6 border-t border-zinc-800/80 pt-4 flex items-center text-xs text-[#1BC464] font-medium'>
                  <span>Simple Pin Placement</span>
                  <ArrowRight className='w-4 h-4 ml-1' />
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className='p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 h-full hover:border-[#1BC464]/30 transition-all duration-300 flex flex-col justify-between'>
                <div>
                  <div className='p-3 rounded-2xl w-fit bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6'>
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className='text-2xl font-bold mb-3 text-white'>2. The Shopper / Store</h3>
                  <p className='text-neutral-400 text-sm leading-relaxed'>
                    Registered local partners located within the recipient&apos;s location boundaries. Shoppers receive orders as instant alerts via WhatsApp. Upon accepting, they prepare items physically and maintain status tracking in the system.
                  </p>
                </div>
                <div className='mt-6 border-t border-zinc-800/80 pt-4 flex items-center text-xs text-[#1BC464] font-medium'>
                  <span>Instant WhatsApp Dispatches</span>
                  <ArrowRight className='w-4 h-4 ml-1' />
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <div className='p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 h-full hover:border-[#1BC464]/30 transition-all duration-300 flex flex-col justify-between'>
                <div>
                  <div className='p-3 rounded-2xl w-fit bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6'>
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className='text-2xl font-bold mb-3 text-white'>3. The Recipient</h3>
                  <p className='text-neutral-400 text-sm leading-relaxed'>
                    The designated target collector. The recipient doesn&apos;t need to pay or coordinates logistics. Once the app reports that items are prepared, they visit the selected partner storefront and collect securely using an order reference code.
                  </p>
                </div>
                <div className='mt-6 border-t border-zinc-800/80 pt-4 flex items-center text-xs text-[#1BC464] font-medium'>
                  <span>Secure Reference Codes</span>
                  <ArrowRight className='w-4 h-4 ml-1' />
                </div>
              </div>
            </MotionWrapper>

          </div>
        </section>

        {/* WORKFLOW TIMELINE SECTION */}
        <section id="how-it-works" className='py-20 border-t border-zinc-900'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <MotionWrapper>
              <Badge className="bg-[#1BC464]/10 text-[#1BC464] border border-[#1BC464]/20 px-3 py-1 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
                🔄 End-to-End Operation
              </Badge>
            </MotionWrapper>
            <MotionWrapper delay={0.1}>
              <h3 className='text-3xl sm:text-5xl font-black tracking-tight mb-4'>
                How eShop Connects the Loop
              </h3>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <p className='text-neutral-400 text-lg'>
                A fully automatic, location-based order dispatch and collection architecture. See exactly how an order is processed from map pin coordinates to physical handoff.
              </p>
            </MotionWrapper>
          </div>

          {/* Stepper Grid List */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative'>
            {workflowSteps.map((step, index) => (
              <MotionWrapper key={index} delay={index * 0.1}>
                <div className='group rounded-3xl p-6 bg-zinc-950/40 backdrop-blur-xl border border-zinc-900 hover:border-zinc-800 h-full flex flex-col justify-between transition-all duration-300 relative overflow-hidden'>
                  
                  {/* Subtle hover background decoration */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />
                  
                  <div className="relative z-10">
                    {/* Top row stepper header */}
                    <div className='flex justify-between items-center mb-6'>
                      <span className='text-xs font-bold tracking-widest text-[#1BC464] opacity-80 uppercase'>
                        Step {step.step}
                      </span>
                      <span className='text-xs font-semibold text-neutral-500 border border-zinc-800 rounded-full px-2 py-0.5 bg-black/40'>
                        {step.actor}
                      </span>
                    </div>

                    <div className={`p-3 rounded-2xl w-fit bg-zinc-900 border border-zinc-800 mb-6 group-hover:scale-105 transition-transform duration-300 ${step.iconColor}`}>
                      <step.icon className='h-6 w-6' />
                    </div>

                    <h4 className='text-lg font-bold mb-2 text-white group-hover:text-[#1BC464] transition-colors'>
                      {step.title}
                    </h4>
                    
                    <p className='text-neutral-400 text-xs sm:text-sm leading-relaxed group-hover:text-neutral-300 transition-colors'>
                      {step.description}
                    </p>
                  </div>

                  {/* Flow Arrow Indicator for Desktop */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute right-[-15px] top-[50%] translate-y-[-50%] z-20 text-zinc-800 group-hover:text-zinc-600 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </MotionWrapper>
            ))}
          </div>

          {/* Text Summary Flow */}
          <MotionWrapper delay={0.4}>
            <div className='mt-12 p-5 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400 text-center'>
              <span className="text-[#1BC464]">Buyer Places Order</span>
              <span className="text-zinc-700">➔</span>
              <span className="text-blue-400">System Finds Shopper</span>
              <span className="text-zinc-700">➔</span>
              <span className="text-green-400">WhatsApp Alert Dispatched</span>
              <span className="text-zinc-700">➔</span>
              <span className="text-purple-400">Shopper Accepts</span>
              <span className="text-zinc-700">➔</span>
              <span className="text-amber-400">Shopper Prepares</span>
              <span className="text-zinc-700">➔</span>
              <span className="text-cyan-400">Order Ready</span>
              <span className="text-zinc-700">➔</span>
              <span className="text-pink-400">Recipient Collects</span>
            </div>
          </MotionWrapper>
        </section>

        {/* SIMULATED ADMIN DASHBOARD OVERVIEW */}
        <section id="admin-center" className='py-20 border-t border-zinc-900 relative'>
          
          {/* Section Heading */}
          <div className='text-center max-w-3xl mx-auto mb-12'>
            <MotionWrapper>
              <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
                📊 Admin Dashboard Metrics
              </Badge>
            </MotionWrapper>
            <MotionWrapper delay={0.1}>
              <h3 className='text-3xl sm:text-5xl font-black tracking-tight mb-4'>
                Real-Time Operational Intelligence
              </h3>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <p className='text-neutral-400 text-lg'>
                Administrators possess full operational oversight over the entire workflow. Track status changes in real-time, monitor shopper counts, and measure transaction throughput across all registered stores.
              </p>
            </MotionWrapper>
          </div>

          {/* Simulated Statistics Panel */}
          <MotionWrapper delay={0.3}>
            <div className="rounded-[2.5rem] bg-gradient-to-b from-zinc-950 to-black border border-zinc-900 p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#1BC464]/5 rounded-full blur-[100px] pointer-events-none" />
              
              {/* Fake dashboard header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-6 mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Mock Admin View</span>
                  <h4 className="text-2xl font-bold text-white mt-1">Platform Control Console</h4>
                </div>
                <div className="flex items-center space-x-2 text-xs bg-[#1BC464]/10 text-[#1BC464] border border-[#1BC464]/20 rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#1BC464] animate-pulse" />
                  <span className="font-semibold uppercase tracking-wider">Live System Feed Connected</span>
                </div>
              </div>

              {/* Stats Metrics Grid */}
              <div className='grid grid-cols-2 lg:grid-cols-6 gap-4'>
                {adminStats.map((stat, i) => (
                  <div key={i} className={`p-5 rounded-2xl bg-zinc-950 border ${stat.borderColor} hover:border-zinc-700 transition-colors duration-300 flex flex-col justify-between`}>
                    <div>
                      <span className="text-xs font-medium text-neutral-400">{stat.title}</span>
                      <h5 className={`text-2xl sm:text-3xl font-extrabold mt-2 ${stat.color}`}>{stat.value}</h5>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-4 leading-normal">{stat.subtext}</p>
                  </div>
                ))}
              </div>

              {/* Extra Simulated Dashboard Graph / Actions Area */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 border-t border-zinc-900 pt-8">
                <div className="md:col-span-8 flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900">
                  <div>
                    <h5 className="font-bold text-white text-sm mb-2">Simulated Live Transaction Flow</h5>
                    <p className="text-xs text-neutral-400">Order dispatch is currently automated via local WhatsApp relays. Standard dispatch matches are resolving inside 4.5 seconds.</p>
                  </div>
                  <div className="h-10 w-full flex items-end space-x-1.5 mt-6">
                    {[35, 45, 60, 40, 50, 75, 90, 65, 55, 70, 85, 95, 80, 110, 120, 130, 100, 115].map((val, idx) => (
                      <div 
                        key={idx} 
                        className={`w-full rounded-sm bg-gradient-to-t from-[#1BC464]/20 to-[#1BC464] transition-all duration-500`}
                        style={{ height: `${val / 1.3}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm mb-2">Platform Administration</h5>
                    <p className="text-xs text-neutral-400">Click below to gain administrative access. View real-time user registrations, adjust shopper locations, and audit collected reference codes.</p>
                  </div>
                  <Link href="/admin" className="w-full mt-6">
                    <Button className="w-full bg-[#1BC464] hover:bg-[#15a351] text-black font-semibold rounded-xl">
                      <span>Launch Dashboard Portal</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className='py-20 border-t border-zinc-900'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <MotionWrapper>
              <Badge className="bg-emerald-500/10 text-[#1BC464] border border-[#1BC464]/20 px-3 py-1 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
                💬 User Love
              </Badge>
            </MotionWrapper>
            <MotionWrapper delay={0.1}>
              <h3 className='text-3xl sm:text-5xl font-black tracking-tight mb-4'>
                Trusted by Partners & Recipients
              </h3>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <p className='text-neutral-400 text-lg'>
                Hear how eShop is streamlining order fulfillment and bridging delivery gaps across local communities.
              </p>
            </MotionWrapper>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <MotionWrapper key={index} delay={index * 0.15}>
                <Card className="bg-zinc-950/30 backdrop-blur-xl border border-zinc-900 h-full flex flex-col justify-between hover:border-neutral-800 transition-all duration-300 shadow-xl rounded-3xl p-1 overflow-hidden">
                  <CardContent className='p-6 sm:p-8 flex flex-col justify-between h-full'>
                    <div>
                      {/* Rating stars */}
                      <div className='flex text-[#1BC464] mb-6 space-x-1'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className='h-4 w-4 fill-current' />
                        ))}
                      </div>
                      <p className='text-neutral-300 text-xs sm:text-sm leading-relaxed italic mb-8'>
                        &quot;{testimonial.comment}&quot;
                      </p>
                    </div>

                    <div className='flex items-center border-t border-zinc-900 pt-6 mt-4'>
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className='w-12 h-12 rounded-full mr-4 object-cover border border-zinc-800'
                        width={48}
                        height={48}
                      />
                      <div>
                        <h4 className='font-bold text-sm sm:text-base text-neutral-100'>{testimonial.name}</h4>
                        <span className='text-xs text-neutral-500'>{testimonial.role}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* HIGH-CONVERTING CALL TO ACTION */}
        <section className='py-16 md:py-24 border-t border-zinc-900'>
          <MotionWrapper>
            <div className='relative rounded-[2.5rem] bg-gradient-to-b from-zinc-900/60 to-zinc-950 border border-zinc-800/80 p-8 sm:p-12 md:p-16 text-center shadow-2xl overflow-hidden group'>
              {/* Radial inner glow */}
              <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 to-transparent pointer-events-none group-hover:scale-105 transition-all duration-700" />
              <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-[#1BC464]/5 blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <Badge className="bg-[#1BC464]/10 text-[#1BC464] border border-[#1BC464]/20 px-3 py-1 text-xs font-semibold rounded-full mb-6 uppercase tracking-widest">
                  🎁 Welcome Offer
                </Badge>
                <h3 className='text-3xl sm:text-5xl font-black mb-6 tracking-tight leading-tight'>
                  Transform Your Local Order Logistics Today
                </h3>
                <p className='text-neutral-400 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl mx-auto'>
                  Install the eShop application now and experience location-based shopping dispatch near you. Safe, verified, and unbelievably quick.
                </p>

                <div className='flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto'>
                  <Button size='lg' className='w-full sm:w-auto bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl px-6 py-6 transition-all duration-300 flex items-center justify-center space-x-2'>
                    <Image
                      src='/apple.jpeg'
                      alt='App Store'
                      className='mr-2 h-5 w-5 rounded-md object-cover'
                      height={20}
                      width={20}
                    />
                    <span>App Store</span>
                  </Button>
                  <Button size='lg' className='w-full sm:w-auto bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl px-6 py-6 transition-all duration-300 flex items-center justify-center space-x-2'>
                    <Image
                      src='/google-play.png'
                      alt='Google Play'
                      className='mr-2 h-5 w-5 rounded-sm'
                      height={20}
                      width={20}
                    />
                    <span>Google Play</span>
                  </Button>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </section> 

      </main>

      {/* ULTRA CLEAN LUXURY FOOTER */}
      <footer className='bg-black border-t border-zinc-900 text-neutral-400 relative z-10 pt-16 pb-8'>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <Link href='/' className='flex items-center space-x-2 mb-6 group'>
                <span className='text-xl font-black tracking-tight text-white group-hover:text-[#1BC464] transition-colors'>
                  eShop<span className='text-[#1BC464] font-black'>.</span>
                </span>
              </Link>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                Your premier location-based coordination platform connecting local retail partners, shoppers, and recipients instantly.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/About" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/Policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/TermsAndCondition" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-6">Get Support</h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li className="hover:text-neutral-300 transition-colors">support@eshopapp.com</li>
                <li className="hover:text-neutral-300 transition-colors">+1 (555) 123-4567</li>
                <li className="hover:text-neutral-300 transition-colors">123 Tech Avenue, Silicon Bay</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-6">Connect</h4>
              <div className="flex space-x-4 text-sm">
                <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
                <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600 gap-4">
            <p>© {new Date().getFullYear()} eShop. All rights reserved.</p>
            <Link
              href="https://github.com/chittspraise"
              target='_blank'
              className='hover:text-neutral-400 transition-colors flex items-center space-x-1'
            >
              <span>Designed & Developed by</span>
              <span className="text-neutral-500 font-semibold hover:text-[#1BC464] transition-colors">@Chitts</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}