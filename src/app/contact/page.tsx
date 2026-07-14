'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError('Please provide all details in the contact form.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please provide a valid email structure.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full flex-grow text-left space-y-12">
      
      {/* 1. Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary-400">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact TaskForge Support</h1>
        <p className="text-sm text-neutral-400">
          Have an inquiry regarding escrow processing, freelancer registration, or business integration? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        
        {/* Contact Information Sidebar (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-6 text-left">
            <h3 className="font-bold text-white text-base">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="text-neutral-400 block font-medium">Headquarters</span>
                  <span className="text-white font-semibold">Mirpur, Dhaka 1216, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="text-neutral-400 block font-medium">Support Line</span>
                  <span className="text-white font-semibold">+880 1712-345678</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="text-neutral-400 block font-medium">General Inquiries</span>
                  <span className="text-white font-semibold">support@taskforge.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ card */}
          <div className="glass-panel p-5 rounded-2xl bg-neutral-900/10 text-left border-neutral-850">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Escrow Disputes</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              If you have active transaction issues, please specify the Task ID and include links to documentation in your message body to speed up auditing.
            </p>
          </div>
        </div>

        {/* Contact Form Panel (3 Cols) */}
        <div className="md:col-span-3">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl">
            <h3 className="font-bold text-white text-lg mb-6 text-left">Send Us a Message</h3>

            {success ? (
              <div className="flex flex-col items-center justify-center p-8 bg-accent-950/20 border border-accent-900/50 rounded-xl space-y-3 animate-fade-in text-center">
                <CheckCircle2 className="w-12 h-12 text-accent-400" />
                <h4 className="font-bold text-white text-sm">Message Transmitted!</h4>
                <p className="text-xs text-neutral-400 max-w-xs">
                  We have cataloged your support submission. A support representative will review and reply within 12 business hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-white rounded-lg border border-neutral-800"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {error && (
                  <div className="flex items-center space-x-2 p-3.5 bg-rose-950/30 border border-rose-900/50 text-rose-400 text-xs rounded-xl animate-fade-in">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-400">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sarah Connor"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-400">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@cybernetic.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Inquiry regarding escrow payouts or contract dispute"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400">Message Body</label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your support request..."
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm focus:outline-none focus:border-primary-500 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
