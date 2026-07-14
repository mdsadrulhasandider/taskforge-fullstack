'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Zap, Layers, Sparkles, Plus, 
  ChevronDown, Send, CheckCircle2, Star, TrendingUp, Users, DollarSign, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Task } from '@/types';

// Mock chart data representing platform growth
const chartData = [
  { name: 'Jan', ActiveProjects: 45, TotalEarnings: 15000 },
  { name: 'Feb', ActiveProjects: 65, TotalEarnings: 22000 },
  { name: 'Mar', ActiveProjects: 80, TotalEarnings: 31000 },
  { name: 'Apr', ActiveProjects: 110, TotalEarnings: 45000 },
  { name: 'May', ActiveProjects: 140, TotalEarnings: 58000 },
  { name: 'Jun', ActiveProjects: 185, TotalEarnings: 74000 },
  { name: 'Jul', ActiveProjects: 220, TotalEarnings: 95000 },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Section state control
  const [activeRole, setActiveRole] = useState<'developer' | 'designer' | 'writer' | 'marketer'>('developer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    setIsMounted(true);
    async function fetchPopularTasks() {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        if (data.tasks) {
          // Take the top 4 tasks for popular section
          setTasks(data.tasks.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching popular tasks:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopularTasks();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Hero Copy content depending on selected role
  const roleContent = {
    developer: {
      title: "Deploy Premium Code on Demand",
      desc: "Hire vetted Next.js, Node.js, and Python experts to scale your software infrastructure instantly.",
      stat: "1,200+ Verified Devs",
      badge: "Tech & Development",
      cta: "Browse Dev Projects"
    },
    designer: {
      title: "Pixel-Perfect UI/UX Design System",
      desc: "Connect with high-caliber Figma, mobile app, and SaaS web designers to build stunning product interfaces.",
      stat: "850+ Product Designers",
      badge: "UI/UX & Graphics",
      cta: "Browse Design Briefs"
    },
    writer: {
      title: "Engaging Technical Content Strategy",
      desc: "Hire expert copywriters and technical editors to curate landing copy, documentation, and blog feeds.",
      stat: "420+ Industry Authors",
      badge: "Copywriting & Blogs",
      cta: "Browse Content Tasks"
    },
    marketer: {
      title: "Accelerate Growth & Product Marketing",
      desc: "Drive growth with specialized SEO analysts, Google Ads leads, and B2B marketing strategists.",
      stat: "600+ Growth Hackers",
      badge: "SEO & Growth",
      cta: "Browse Growth Contracts"
    }
  };

  return (
    <div className="w-full flex flex-col overflow-hidden">
      
      {/* 1. HERO SECTION (Height: 60-70vh) */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-primary-600/10 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-80 h-80 rounded-full bg-secondary-600/10 blur-[120px] animate-pulse-slow"></div>

        <div className="max-w-6xl w-full text-center relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel text-xs text-primary-400 font-semibold mb-6 border border-primary-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TaskForge 2.0 Beta Launched</span>
          </div>

          {/* Interactive Role Tabs */}
          <div className="flex bg-neutral-900/60 p-1.5 rounded-xl border border-neutral-800 mb-8 max-w-lg w-full">
            {(['developer', 'designer', 'writer', 'marketer'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex-1 text-xs py-2 px-1 sm:px-3 font-semibold rounded-lg capitalize transition-all duration-300 ${
                  activeRole === role
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Hero Heading & Subtitle */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-4 animate-fade-in-up">
            {roleContent[activeRole].title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mb-8 animate-fade-in">
            {roleContent[activeRole].desc}
          </p>

          {/* CTA and Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Link
              href="/explore"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:from-primary-500 hover:to-secondary-500 shadow-lg shadow-primary-500/25 transition-all duration-200"
            >
              <span>{roleContent[activeRole].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-sm font-semibold text-neutral-300 px-6 py-3 rounded-xl glass-panel border border-neutral-800">
              {roleContent[activeRole].stat}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">Engineered for Vetted Collaborations</h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            TaskForge bridges the gap between complex software parameters and top-tier remote freelancers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl text-left hover:border-primary-500/30 transition-all duration-300">
            <div className="p-3 bg-primary-600/10 rounded-xl inline-block mb-6 border border-primary-500/20">
              <ShieldCheck className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Vetted Professional Network</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We screen every freelancer through structural portfolio reviews and technical coding assignments to guarantee quality.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl text-left hover:border-secondary-500/30 transition-all duration-300">
            <div className="p-3 bg-secondary-600/10 rounded-xl inline-block mb-6 border border-secondary-500/20">
              <Zap className="w-6 h-6 text-secondary-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Secure Task Escrows</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Payments are locked in escrow accounts and released dynamically only upon validation of milestone parameters.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl text-left hover:border-accent-500/30 transition-all duration-300">
            <div className="p-3 bg-accent-600/10 rounded-xl inline-block mb-6 border border-accent-500/20">
              <Layers className="w-6 h-6 text-accent-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dynamic Pipeline Monitoring</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Track project milestones, upload artifacts, verify reviews, and audit progress logs on a single dashboard workspace.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM STATISTICS & DATA CHART */}
      <section className="py-20 bg-neutral-900/40 border-y border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Stats Left Card */}
            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-400">Live Analytics</span>
                <h2 className="text-2xl sm:text-4xl font-bold mt-2">Platform Metrics</h2>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                TaskForge tracks and processes live growth metrics to evaluate freelancer performance, total job payouts, and success timelines.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-xl">
                  <div className="text-2xl font-bold text-white flex items-center">
                    <TrendingUp className="w-4 h-4 text-accent-400 mr-2" />
                    <span>98.6%</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">Task Success Rate</span>
                </div>
                <div className="glass-panel p-4 rounded-xl">
                  <div className="text-2xl font-bold text-white flex items-center">
                    <Users className="w-4 h-4 text-primary-400 mr-2" />
                    <span>2.4k+</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">Active Freelancers</span>
                </div>
                <div className="glass-panel p-4 rounded-xl">
                  <div className="text-2xl font-bold text-white flex items-center">
                    <DollarSign className="w-4 h-4 text-secondary-400 mr-2" />
                    <span>$1.2M</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">Total Paid Escrow</span>
                </div>
                <div className="glass-panel p-4 rounded-xl">
                  <div className="text-2xl font-bold text-white flex items-center">
                    <Calendar className="w-4 h-4 text-accent-400 mr-2" />
                    <span>14 Days</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">Avg Completion Time</span>
                </div>
              </div>
            </div>

            {/* Recharts Area Chart container */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl h-[350px] w-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-neutral-200">Active Platform Growth (2026)</span>
                <span className="text-xs text-neutral-500 font-medium">Updated 1 hr ago</span>
              </div>
              
              <div className="w-full flex-grow relative">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          borderColor: '#334155',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '12px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="ActiveProjects" 
                        name="Active Projects" 
                        stroke="#4f46e5" 
                        fillOpacity={1} 
                        fill="url(#colorProjects)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="TotalEarnings" 
                        name="Earnings ($)" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorEarnings)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full skeleton-bg rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC POPULAR LISTING SECTION (4 Cards per row) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-400">Featured Openings</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Active Task Listings</h2>
          </div>
          <Link 
            href="/explore" 
            className="mt-4 sm:mt-0 flex items-center space-x-1 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
          >
            <span>Explore all tasks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Skeleton grid on loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel p-4 rounded-xl flex flex-col space-y-4 h-[420px]">
                <div className="w-full h-40 skeleton-bg rounded-lg"></div>
                <div className="h-6 w-3/4 skeleton-bg rounded"></div>
                <div className="h-4 w-full skeleton-bg rounded"></div>
                <div className="h-4 w-2/3 skeleton-bg rounded"></div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-900">
                  <div className="h-4 w-16 skeleton-bg rounded"></div>
                  <div className="h-8 w-24 skeleton-bg rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <div 
                key={task._id} 
                className="glass-panel p-4 rounded-2xl flex flex-col text-left glass-panel-hover h-[440px]"
              >
                {/* Task Cover Image */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 shrink-0 bg-neutral-900">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-neutral-900/90 text-primary-400 border border-primary-500/25">
                    {task.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-white text-base line-clamp-2 mb-2 leading-snug">
                    {task.title}
                  </h3>
                  <p className="text-neutral-400 text-xs line-clamp-3 mb-4 leading-relaxed">
                    {task.shortDescription}
                  </p>

                  {/* Meta parameters */}
                  <div className="grid grid-cols-2 gap-y-2 mt-auto text-[11px] text-neutral-500 font-medium mb-4">
                    <div className="flex items-center space-x-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                      <span className="text-neutral-300">${task.budget}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-neutral-300">{task.rating} Rating</span>
                    </div>
                    <div className="flex items-center space-x-1.5 col-span-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
                      <span className="truncate">Client: {task.clientName}</span>
                    </div>
                  </div>

                  {/* Details Link */}
                  <Link
                    href={`/items/${task._id}`}
                    className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white bg-neutral-900 border border-neutral-800 hover:border-primary-500 hover:bg-neutral-800 transition-all duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. PROCESS/HOW IT WORKS SECTION */}
      <section className="py-20 bg-neutral-900/30 border-t border-neutral-900 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-400">Simple Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">How TaskForge Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-primary-600/10 border border-primary-500/25 flex items-center justify-center text-primary-400 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-bold text-white mb-2">Create Task Requirements</h3>
              <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                Client registers, inputs task specifications, assigns budgets, deadlines, and posts directly to our live index.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-secondary-600/10 border border-secondary-500/25 flex items-center justify-center text-secondary-400 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-bold text-white mb-2">Match Vetted Professionals</h3>
              <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                Qualified freelance specialists submit proposals. Our algorithm highlights match profiles automatically.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-accent-600/10 border border-accent-500/25 flex items-center justify-center text-accent-400 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-bold text-white mb-2">Verify & Release Escrow</h3>
              <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                Milestones are verified via dashboard code reviews, files are processed, and escrow funds are instantly released.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-400">Success Stories</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">Vouched by Tech Leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-56">
            <p className="text-neutral-300 text-sm italic leading-relaxed">
              "TaskForge simplified our developer contract workflows. Vetting candidates took hours instead of weeks, and the escrow system protected our seed budget."
            </p>
            <div className="flex items-center space-x-3 mt-6 border-t border-neutral-900 pt-4">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-primary-400 border border-neutral-700">
                SC
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sarah Connor</h4>
                <span className="text-[11px] text-neutral-500">CTO, Cybernetic Solutions</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-56">
            <p className="text-neutral-300 text-sm italic leading-relaxed">
              "As a developer, finding high-budget client contracts that don't involve endless bidding cycles is a dream. The API integrations are clean and support instant withdrawals."
            </p>
            <div className="flex items-center space-x-3 mt-6 border-t border-neutral-900 pt-4">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-secondary-400 border border-neutral-700">
                TH
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Tanvir Hasan</h4>
                <span className="text-[11px] text-neutral-500">Senior Next.js Contractor</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-56">
            <p className="text-neutral-300 text-sm italic leading-relaxed">
              "TaskForge's escrow process guarantees payment upon milestone parameters. It helps our marketing agency hire copywriters quickly without legal delays."
            </p>
            <div className="flex items-center space-x-3 mt-6 border-t border-neutral-900 pt-4">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-accent-400 border border-neutral-700">
                AB
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Anik Bhowmik</h4>
                <span className="text-[11px] text-neutral-500">Director, GrowthSaaS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-neutral-900/20 border-t border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-400">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What measures define TaskForge's freelancer vetting process?",
                a: "Every registrant applying for a freelancer account submits a technical portfolio. Next, they complete a sandboxed test assignment evaluating clean code architecture, TypeScript types, and styling fidelity before gaining listing permissions."
              },
              {
                q: "How does the milestone escrow mechanism protect funds?",
                a: "When a client locks a freelancer for a task, the budget is deposited into a secured escrow account. Funds are released dynamically as soon as both developer submits artifacts and client approves milestones, or automatically in case of dispute window lapse."
              },
              {
                q: "What categories of tasks can clients submit on TaskForge?",
                a: "TaskForge focuses on technical deliverables including Web Development, Mobile Engineering, Graphic UI/UX Design, Growth Marketing setups, and Developer API Copywriting."
              },
              {
                q: "Is there a platform fee for posting and apply procedures?",
                a: "Posting tasks is entirely free. A minor processing escrow fee of 3% is charged to clients, and a 5% payout fee is charged to contractors on finalized milestones."
              }
            ].map((item, index) => (
              <div key={index} className="glass-panel rounded-xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:bg-neutral-900/60"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-sm text-neutral-400 leading-relaxed border-t border-neutral-900 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SIGN-UP SECTION */}
      <section className="py-20 border-t border-neutral-900 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-t from-neutral-950 to-neutral-900">
        <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <span className="text-xs font-bold uppercase tracking-wider text-primary-400">Weekly Updates</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">Subscribe to TaskForge Briefs</h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-8">
            Get curated lists of high-budget developer openings, contract releases, and tech trends delivered to your inbox.
          </p>

          {newsletterSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-2 text-accent-400 bg-accent-950/20 border border-accent-900/50 p-4 rounded-xl max-w-md mx-auto animate-fade-in">
              <CheckCircle2 className="w-8 h-8" />
              <span className="text-sm font-semibold">Success! Check your inbox for validation link.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-3">
              <div className="w-full relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 text-sm transition-all"
                  required
                />
                {newsletterError && (
                  <span className="absolute left-1 -bottom-5 text-[10px] text-rose-500 font-semibold">{newsletterError}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:from-primary-500 hover:to-secondary-500 active:scale-95 transition-all duration-200"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
