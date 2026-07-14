'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Mail, Phone, MapPin, Github, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 text-left">
            <Link href="/" className="flex items-center space-x-2 text-white group">
              <div className="p-2 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-lg">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-wider">TaskForge</span>
            </Link>
            <p className="text-sm text-neutral-400">
              The premier full-stack task marketplace enabling teams to hire vetted freelancers, manage active deliverables, and deploy code seamlessly.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Explore Tasks
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Freelancer Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
                <span>Mirpur, Dhaka 1216, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-400 text-sm">
                <Phone className="w-4 h-4 text-secondary-500 shrink-0" />
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-400 text-sm">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                <span>support@taskforge.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-neutral-500">&copy; {currentYear} TaskForge Inc. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-accent-500" />
            <span>Secured with JWT and Bcrypt Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
