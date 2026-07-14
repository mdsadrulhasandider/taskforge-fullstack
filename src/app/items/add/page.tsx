'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle, ShieldAlert, CheckCircle2, DollarSign, ListCollapse, ArrowRight } from 'lucide-react';

export default function AddTask() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Form Fields State
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('Development');
  const [location, setLocation] = useState('Remote');
  const [priority, setPriority] = useState('medium');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDescription || !fullDescription || !budget || !category || !location || !priority) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (parseFloat(budget) <= 0) {
      setError('Budget must be a positive number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          shortDescription,
          fullDescription,
          budget: parseFloat(budget),
          category,
          location,
          priority,
          image: image || undefined // fallback inside API
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to submit task');
      } else {
        setSuccess(true);
        // Clear fields
        setTitle('');
        setShortDescription('');
        setFullDescription('');
        setBudget('');
        setImage('');
        
        setTimeout(() => {
          router.push('/explore');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-neutral-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) return null; // Avoid render before redirect

  const categories = ['Development', 'Design', 'Writing', 'Marketing'];
  const locations = ['Remote', 'Hybrid', 'On-site'];
  const priorities = ['low', 'medium', 'high'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full flex-grow text-left">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl relative">
        {/* Glowing header accents */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-primary-600/5 rounded-full blur-3xl"></div>

        {/* Title */}
        <div className="flex items-center space-x-3 mb-8 border-b border-neutral-900 pb-4">
          <div className="p-2.5 bg-primary-600/10 text-primary-400 rounded-xl border border-primary-500/25">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Post New Project Task</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Define specifications, assign budget parameters, and hire.</p>
          </div>
        </div>

        {/* Form Feedbacks */}
        {error && (
          <div className="flex items-center space-x-2 p-3.5 bg-rose-955/30 border border-rose-900/50 text-rose-400 text-xs rounded-xl mb-6 animate-fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 p-3.5 bg-accent-955/20 border border-accent-900/50 text-accent-400 text-xs rounded-xl mb-6 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Task posted successfully! Directing back to explore board...</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Develop Stripe Payment Webhooks for SaaS portal"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-550 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Project Budget ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="850"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-550"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Work Environment</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white cursor-pointer"
              >
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white cursor-pointer"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Task Summary Description</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Short, direct summary explaining project goals (max 150 characters)..."
              maxLength={150}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-550"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Full Scope & Specifications</label>
            <textarea
              rows={6}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Provide a detailed scope of deliverables, tech stack requirements, testing criteria, and handoff guidelines..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-550 resize-none"
              required
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Cover Image URL (Optional)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-primary-500 text-xs sm:text-sm text-white placeholder-neutral-550"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
          >
            <span>{loading ? 'Submitting details...' : 'Deploy Contract Lock'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
