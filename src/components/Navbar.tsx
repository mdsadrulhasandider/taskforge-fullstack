'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Menu, X, User as UserIcon, LogOut, PlusCircle, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Routes configuration
  // Minimum 3 routes when logged out: Home, Explore, About
  // Minimum 5 routes when logged in: Home, Explore, Add Task, Manage Tasks, About, Contact
  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'About', path: '/about' },
  ];

  const loggedInLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Add Task', path: '/items/add' },
    { name: 'Manage Tasks', path: '/items/manage' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const links = user ? loggedInLinks : publicLinks;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white group">
              <div className="p-2 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-primary-400">
                TaskForge
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-neutral-800 text-white border-b-2 border-primary-500'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary-400" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-neutral-200 leading-none">{user.name}</span>
                    <span className="text-xs text-neutral-500 capitalize">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-950/40 border border-rose-900/30 hover:border-rose-500 transition-all duration-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-md shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-panel border-x-0 border-b border-neutral-800 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-left">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 pb-2 border-t border-neutral-800 mt-2">
                <div className="flex items-center px-3 space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-neutral-200">{user.name}</div>
                    <div className="text-sm font-medium text-neutral-500 capitalize">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-rose-400 hover:text-white hover:bg-rose-950/40"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-neutral-800 mt-2 flex flex-col space-y-2 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 rounded-lg text-center text-sm font-medium text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 rounded-lg text-center text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
