'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, DollarSign, Star, SlidersHorizontal, ArrowUpDown, 
  MapPin, CheckSquare, RefreshCw, X, ChevronRight, Layers, HelpCircle
} from 'lucide-react';
import { Task } from '@/types';

export default function Explore() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [priority, setPriority] = useState('All');
  
  // Sorting States
  const [sortBy, setSortBy] = useState('date'); // date, budget, rating
  const [sortOrder, setSortOrder] = useState('desc'); // desc, asc
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ['All', 'Development', 'Design', 'Writing', 'Marketing'];
  const locations = ['All', 'Remote', 'Hybrid', 'On-site'];
  const priorities = ['All', 'low', 'medium', 'high'];

  // Fetch tasks with filters
  const fetchFilteredTasks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'All') params.append('category', category);
      if (location && location !== 'All') params.append('location', location);
      if (minBudget) params.append('minBudget', minBudget);
      if (maxBudget) params.append('maxBudget', maxBudget);
      if (priority && priority !== 'All') params.append('priority', priority);
      
      params.append('sortBy', sortBy);
      params.append('order', sortOrder);

      const res = await fetch(`/api/tasks?${params.toString()}`);
      const data = await res.json();
      if (data.tasks) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Error loading filtered tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load and filter change trigger
    const delayDebounce = setTimeout(() => {
      fetchFilteredTasks();
    }, 300); // debounce API requests

    return () => clearTimeout(delayDebounce);
  }, [search, category, location, minBudget, maxBudget, priority, sortBy, sortOrder]);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All');
    setLocation('All');
    setMinBudget('');
    setMaxBudget('');
    setPriority('All');
    setSortBy('date');
    setSortOrder('desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full flex-grow flex flex-col text-left">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Explore Available Tasks</h1>
        <p className="text-sm text-neutral-400 mt-2">Vetted contracts, clear parameters, dynamic escrow releases.</p>
      </div>

      {/* Control Panel: Search & Sorter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Search Bar */}
        <div className="lg:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by keywords (e.g. Next.js, Figma)..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:outline-none focus:border-primary-500 text-sm text-white placeholder-neutral-500 transition-all"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Actions */}
        <div className="relative flex space-x-2">
          <div className="w-full relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="w-full pl-10 pr-8 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold text-neutral-300 focus:outline-none focus:border-primary-500 cursor-pointer appearance-none"
            >
              <option value="date-desc">Newest Posted</option>
              <option value="date-asc">Oldest Posted</option>
              <option value="budget-desc">Budget: High to Low</option>
              <option value="budget-asc">Budget: Low to High</option>
              <option value="rating-desc">Rating: Highest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTERS PANEL (Desktop Sidebar) */}
        <div className="glass-panel p-6 rounded-2xl h-fit space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <span className="font-bold text-white flex items-center text-sm">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-primary-400" />
              Filter Board
            </span>
            <button 
              onClick={handleClearFilters}
              className="text-[11px] font-semibold text-neutral-500 hover:text-rose-400 flex items-center"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Category</span>
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs py-2 px-3 rounded-lg text-left font-medium transition-all ${
                    category === cat
                      ? 'bg-primary-600/10 text-primary-400 border border-primary-500/25 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Budget Range ($)</span>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                placeholder="Min"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-850 rounded-lg text-xs focus:outline-none focus:border-primary-500 text-white placeholder-neutral-600"
              />
              <span className="text-neutral-500 text-xs">-</span>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="Max"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-850 rounded-lg text-xs focus:outline-none focus:border-primary-500 text-white placeholder-neutral-600"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Work Location</span>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`text-[11px] font-semibold py-1.5 px-3 rounded-lg transition-all ${
                    location === loc
                      ? 'bg-secondary-600/10 text-secondary-400 border border-secondary-500/25'
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-850 hover:text-white'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Level */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Task Priority</span>
            <div className="flex flex-col space-y-1">
              {priorities.map((prio) => (
                <label 
                  key={prio} 
                  className="flex items-center space-x-2.5 py-1.5 px-2 rounded-lg hover:bg-neutral-900/50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={priority === prio}
                    onChange={() => setPriority(prio)}
                    className="accent-primary-500 rounded border-neutral-800"
                  />
                  <span className="text-xs font-medium capitalize text-neutral-300">{prio}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* LISTINGS DISPLAY (Desktop 3-column content) */}
        <div className="lg:col-span-3 flex flex-col">
          
          {/* Skeleton Load State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : tasks.length === 0 ? (
            /* Empty Data State */
            <div className="glass-panel p-12 rounded-2xl text-center flex flex-col items-center justify-center space-y-4 my-8">
              <div className="p-4 bg-neutral-900 rounded-full text-neutral-600">
                <HelpCircle className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold text-white">No Tasks Match Filters</h3>
              <p className="text-sm text-neutral-400 max-w-sm">
                Try widening your budget limits, clearing search entries, or checking other task categories.
              </p>
              <button 
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs font-semibold text-white"
              >
                Clear All Board Filters
              </button>
            </div>
          ) : (
            /* Cards Listing (Desktop 3 cards per row inside layout) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.slice(0, visibleCount).map((task) => (
                <div 
                  key={task._id} 
                  className="glass-panel p-4 rounded-2xl flex flex-col text-left glass-panel-hover h-[440px]"
                >
                  {/* Card Cover */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-neutral-900 shrink-0">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-900/90 text-primary-400 border border-primary-500/20">
                      {task.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2 leading-snug mb-1.5">
                      {task.title}
                    </h3>
                    <p className="text-neutral-400 text-xs line-clamp-3 mb-4 leading-relaxed">
                      {task.shortDescription}
                    </p>

                    {/* Metadata block */}
                    <div className="grid grid-cols-2 gap-y-2 mt-auto text-[11px] text-neutral-500 font-medium mb-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                        <span className="text-neutral-300 font-semibold">${task.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-neutral-300 font-semibold">{task.rating} Rating</span>
                      </div>
                      <div className="flex items-center space-x-1 col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                        <span className="truncate">Type: {task.location}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/items/${task._id}`}
                      className="w-full py-2 rounded-xl text-center text-xs font-semibold text-white bg-neutral-900 border border-neutral-800 hover:border-primary-500 hover:bg-neutral-800 transition-all duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && tasks.length > visibleCount && (
            <div className="flex justify-center mt-12 mb-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="flex items-center space-x-1.5 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-semibold text-white transition-all"
              >
                <span>Load More Opportunities</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
