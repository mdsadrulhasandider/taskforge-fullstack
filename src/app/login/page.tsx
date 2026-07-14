'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Key, Mail, ShieldAlert, CheckCircle2, User, ShieldCheck } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const { user, login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login(email, password);

    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Invalid credentials');
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  // Demo account helper: autofills and logs in
  const handleDemoLogin = async (role: 'freelancer' | 'client') => {
    const demoEmail = role === 'freelancer' ? 'user@taskforge.com' : 'admin@taskforge.com';
    const demoPassword = role === 'freelancer' ? 'password123' : 'admin123';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');

    const res = await login(demoEmail, demoPassword);
    
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Demo login failed');
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative">
      {/* Background radial effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary-600/5 blur-[90px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 glass-panel p-8 rounded-3xl relative z-10">
        
        {/* Top Brand logo */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sign In to TaskForge</h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Or{' '}
            <Link href="/register" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
              create a new contractor account
            </Link>
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-rose-950/30 border border-rose-900/50 text-rose-400 text-xs rounded-xl animate-fade-in text-left">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-3 bg-accent-955/20 border border-accent-900/50 text-accent-400 text-xs rounded-xl animate-fade-in text-left">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Authenticated successfully. Redirecting...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Password</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-500 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-neutral-850"></div>
          <span className="flex-shrink mx-4 text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Demo Quick Access</span>
          <div className="flex-grow border-t border-neutral-850"></div>
        </div>

        {/* Demo buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleDemoLogin('freelancer')}
            className="flex items-center justify-center space-x-2 p-3 bg-neutral-900 border border-neutral-850 hover:border-primary-500/50 hover:bg-neutral-850 rounded-xl transition-all group"
          >
            <User className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform" />
            <div className="text-left leading-none">
              <span className="text-[10px] font-bold text-white block">Freelancer Demo</span>
              <span className="text-[9px] text-neutral-500 font-mono">user@taskforge.com</span>
            </div>
          </button>

          <button
            onClick={() => handleDemoLogin('client')}
            className="flex items-center justify-center space-x-2 p-3 bg-neutral-900 border border-neutral-850 hover:border-secondary-500/50 hover:bg-neutral-850 rounded-xl transition-all group"
          >
            <ShieldCheck className="w-4 h-4 text-secondary-400 group-hover:scale-110 transition-transform" />
            <div className="text-left leading-none">
              <span className="text-[10px] font-bold text-white block">Client/Admin Demo</span>
              <span className="text-[9px] text-neutral-500 font-mono">admin@taskforge.com</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
