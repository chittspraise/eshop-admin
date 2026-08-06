"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { adminSignUp } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await adminSignUp(email, password);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Signed up successfully! Please check your email to confirm.");
      router.push("/auth/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden font-sans">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#1BC464]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />

      {/* Back to Login/Home button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/auth/admin">
          <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-neutral-900/50 rounded-full pl-3 pr-4 py-2 flex items-center space-x-2 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Login</span>
          </Button>
        </Link>
      </div>

      {/* Main glassmorphic login card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        <div className="bg-zinc-950/40 backdrop-blur-xl border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 sm:p-10 rounded-3xl relative overflow-hidden group hover:border-[#1BC464]/20 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#1BC464]/5 rounded-full blur-[40px] pointer-events-none" />
          
          {/* Brand Logo Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block group-hover:scale-105 transition-transform duration-300">
              <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                eShop<span className="text-[#1BC464] font-black">.</span>
              </span>
            </Link>
            <h2 className="text-xl font-bold tracking-tight text-neutral-100 mt-4">Create Admin Account</h2>
            <p className="text-neutral-500 text-sm mt-1.5">Sign up to join as a certified eShop system administrator.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Email Input Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300 text-xs font-semibold uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="w-4 h-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@eshop.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-zinc-800 text-white placeholder-neutral-600 rounded-xl focus-visible:ring-[#1BC464] focus-visible:border-[#1BC464] focus-visible:ring-offset-0 pl-10 h-12 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-300 text-xs font-semibold uppercase tracking-wider">
                Create Password
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </span>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-zinc-800 text-white placeholder-neutral-600 rounded-xl focus-visible:ring-[#1BC464] focus-visible:border-[#1BC464] focus-visible:ring-offset-0 pl-10 h-12 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-[#1BC464] hover:bg-[#15a351] text-black font-semibold h-12 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(27,196,100,0.15)] hover:shadow-[0_0_25px_rgba(27,196,100,0.35)] flex items-center justify-center space-x-2 mt-2" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Register Administrator</span>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 border-t border-zinc-900 pt-6 text-center text-sm text-neutral-500">
            Already have an administrator account?{" "}
            <Link href="/auth/admin" className="text-[#1BC464] hover:text-emerald-400 font-semibold transition-colors">
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}