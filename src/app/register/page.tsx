'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, User, Mail, Key, ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const { user, register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'freelancer' | 'client'>('freelancer');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please provide all registration fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await register(name, email, password, role);
    
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Registration failed');
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative">
      {/* Background glow radial */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-secondary-600/5 blur-[90px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 glass-panel p-8 rounded-3xl relative z-10">
        
        {/* Top Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Create TaskForge Account</h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
              Sign In here
            </Link>
          </p>
        </div>

        {/* Feedback panels */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-rose-950/30 border border-rose-900/50 text-rose-400 text-xs rounded-xl animate-fade-in text-left">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-3 bg-accent-955/20 border border-accent-900/50 text-accent-400 text-xs rounded-xl animate-fade-in text-left">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Account created successfully! Forwarding to login...</span>
          </div>
        )}

        {/* Form Registration */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Connor"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@company.com"
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
                placeholder="Min 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Account Role Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400">Select Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('freelancer')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs capitalize flex flex-col items-center justify-center space-y-1 transition-all ${
                  role === 'freelancer'
                    ? 'border-primary-500 bg-primary-600/10 text-primary-400'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Freelancer</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('client')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs capitalize flex flex-col items-center justify-center space-y-1 transition-all ${
                  role === 'client'
                    ? 'border-secondary-500 bg-secondary-600/10 text-secondary-400'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Client / Employer</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

      </div>
    </div>
  );
}
