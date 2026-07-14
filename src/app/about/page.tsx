'use client';

import React from 'react';
import { Shield, Users, Globe, Code, Zap, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full flex-grow text-left space-y-16">
      
      {/* 1. Header Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-400">Our Mission</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          Pioneering Secure Remote Engagements
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          TaskForge was founded to build a secure workspace bridging elite design and development talent with modern enterprise clients. We combine automated vetting with milestone escrow controls to simplify contracting.
        </p>
      </div>

      {/* 2. Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="p-3 bg-primary-600/10 text-primary-400 rounded-xl inline-block border border-primary-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Trust & Security</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            All contract payouts are locked in secure escrow feeds. Withdrawals are processed immediately upon project approval.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="p-3 bg-secondary-600/10 text-secondary-400 rounded-xl inline-block border border-secondary-500/20">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Verified Expertise</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Freelancers undergo rigorous assessments verifying programming skill, layout style fidelity, and communication fluency.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="p-3 bg-accent-600/10 text-accent-400 rounded-xl inline-block border border-accent-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Global Workspace</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Collaborate across timezones with integrated trackers, shared repositories, and real-time dashboard notifications.
          </p>
        </div>
      </div>

      {/* 3. Company Timeline / Parameters */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">The TaskForge Standard</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Unlike traditional freelancing sites, we don't believe in listing spam or infinite bidding cycles. We curate high-budget project opportunities and present them directly to qualified technical leaders.
          </p>
          <div className="space-y-3 pt-2">
            {[
              "3-Stage technical testing routine",
              "Escrow system backed by verified banks",
              "Transparent client ratings and developer review board",
              "Zero pricing bid wars"
            ].map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-neutral-300">
                <Zap className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
            alt="Collaborative workspace team members working together"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 p-4 bg-neutral-950/90 rounded-xl border border-neutral-800 flex items-center space-x-3">
            <Award className="w-8 h-8 text-amber-500" />
            <div>
              <h4 className="text-xs font-bold text-white">Top 10 Tech Marketplace</h4>
              <span className="text-[10px] text-neutral-400">Ranked by Global Tech Reviews 2026</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
