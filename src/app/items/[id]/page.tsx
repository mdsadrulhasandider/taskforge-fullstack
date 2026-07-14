'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, DollarSign, Calendar, MapPin, Tag, Flag, Star, 
  User, CheckCircle, ShieldAlert, Award, FileText, Share2
} from 'lucide-react';
import { Task } from '@/types';

export default function TaskDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const [task, setTask] = useState<Task | null>(null);
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadTaskDetails() {
      setLoading(true);
      try {
        const res = await fetch(`/api/tasks/${id}`);
        const data = await res.json();
        
        if (data.task) {
          setTask(data.task);
          
          // Fetch related tasks of the same category
          const relatedRes = await fetch(`/api/tasks?category=${data.task.category}`);
          const relatedData = await relatedRes.json();
          if (relatedData.tasks) {
            // Filter out current task
            const filtered = relatedData.tasks.filter((t: Task) => t._id !== id).slice(0, 3);
            setRelatedTasks(filtered);
          }
        }
      } catch (err) {
        console.error('Error loading task details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTaskDetails();
  }, [id]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 w-full flex-grow text-left space-y-8">
        <div className="h-6 w-24 skeleton-bg rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-80 w-full skeleton-bg rounded-2xl"></div>
            <div className="h-10 w-3/4 skeleton-bg rounded"></div>
            <div className="h-24 w-full skeleton-bg rounded"></div>
          </div>
          <div className="h-80 w-full skeleton-bg rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-4 flex-grow">
        <div className="p-4 bg-neutral-900 rounded-full text-rose-500">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-xl font-bold text-white">Task Listing Not Found</h2>
        <p className="text-sm text-neutral-400">The page link may have expired or this task was deleted by the owner.</p>
        <Link 
          href="/explore" 
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl text-xs font-semibold text-white shadow-lg shadow-primary-500/20"
        >
          Return to Explore
        </Link>
      </div>
    );
  }

  // Format date nicely
  const formattedDate = task.date ? new Date(task.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : 'Recently posted';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full flex-grow text-left">
      
      {/* Back to Explore Links */}
      <div className="mb-6 flex items-center justify-between">
        <Link 
          href="/explore" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Task Board</span>
        </Link>
        
        <button
          onClick={handleShare}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Copied Link!' : 'Share Task'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Media Showcase & Descriptions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Media Showcase */}
          <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <img
              src={task.image}
              alt={task.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded bg-primary-600 text-xs font-bold text-white uppercase tracking-wider mb-2 inline-block">
                {task.category}
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {task.title}
              </h1>
            </div>
          </div>

          {/* Description Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center border-b border-neutral-855 pb-3">
              <FileText className="w-5 h-5 mr-2 text-primary-400" />
              Task Overview & Requirements
            </h2>
            <div className="text-sm text-neutral-300 leading-relaxed space-y-4 whitespace-pre-line">
              <p className="font-semibold text-white">Project Scope:</p>
              <p>{task.fullDescription}</p>
              
              <p className="font-semibold text-white mt-4">Key Deliverables:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Production-ready source files delivered in strict compliance with specifications.</li>
                <li>Comprehensive test coverage validating endpoint functions.</li>
                <li>Documentation outlining install parameters and deployment instructions.</li>
              </ul>
            </div>
          </div>

          {/* Reviews & Ratings Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center border-b border-neutral-855 pb-3">
              <Award className="w-5 h-5 mr-2 text-amber-500" />
              Client History & Reviews
            </h2>
            
            <div className="flex items-center space-x-4 p-4 bg-neutral-900/40 rounded-xl border border-neutral-800">
              <div className="w-12 h-12 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center font-bold text-lg text-primary-400 uppercase">
                {task.clientName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{task.clientName}</h4>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-400 mt-1">
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                    {task.rating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>12 Projects Completed</span>
                  <span>•</span>
                  <span className="text-accent-500">Vetted Employer</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="border-b border-neutral-900 pb-4">
                <div className="flex justify-between items-center text-xs text-neutral-500 mb-1">
                  <span className="font-semibold text-neutral-300">Anisur Rahman (Freelance Dev)</span>
                  <span>1 month ago</span>
                </div>
                <div className="flex text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  "Fantastic client. Requirements were explicitly clear from the start. Milestone escrows were deposited and verified on time. Would love to partner with them again."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Specifications Sidebar & Actions */}
        <div className="space-y-6">
          
          {/* Main Parameters Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="pb-4 border-b border-neutral-800 text-left">
              <span className="text-xs font-bold text-neutral-500 uppercase block tracking-wider">Project Budget</span>
              <div className="flex items-baseline text-white mt-1">
                <DollarSign className="w-7 h-7 text-accent-500 -ml-1 shrink-0" />
                <span className="text-3xl sm:text-4xl font-extrabold">{task.budget}</span>
                <span className="text-xs text-neutral-500 ml-2 font-medium">USD Escrow Lock</span>
              </div>
            </div>

            {/* Specifications list */}
            <div className="space-y-4 text-left">
              
              <div className="flex items-start space-x-3 text-sm">
                <Calendar className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 text-xs block">Posted On</span>
                  <span className="text-neutral-200 font-semibold">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-secondary-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 text-xs block">Work Type</span>
                  <span className="text-neutral-200 font-semibold">{task.location}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Tag className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 text-xs block">Tech Stack / Category</span>
                  <span className="text-neutral-200 font-semibold">{task.category}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Flag className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 text-xs block">Priority Ranking</span>
                  <span className="text-neutral-200 font-semibold capitalize">{task.priority}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <User className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 text-xs block">Client Contact</span>
                  <span className="text-neutral-200 font-semibold block">{task.clientName}</span>
                  <span className="text-xs text-neutral-400 font-mono truncate block max-w-[200px]">{task.clientEmail}</span>
                </div>
              </div>
            </div>

            {/* Application Action Button */}
            <button
              onClick={() => alert('Applications are mock simulation! You have successfully sent a proposal context.')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg shadow-primary-600/20 active:scale-95 transition-all"
            >
              Apply for Contract
            </button>
          </div>

          {/* Escrow Guarantee Info Card */}
          <div className="glass-panel p-5 rounded-2xl flex items-start space-x-3 bg-neutral-900/20">
            <CheckCircle className="w-5 h-5 text-accent-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Escrow Lock Assured</h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                This project budget has been pre-verified and locked in escrow. Releases occur immediately upon verification of tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED ITEMS SECTION */}
      {relatedTasks.length > 0 && (
        <section className="mt-16 pt-12 border-t border-neutral-900 text-left">
          <h2 className="text-xl font-bold text-white mb-6">Related Project Listings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedTasks.map((t) => (
              <div 
                key={t._id} 
                className="glass-panel p-4 rounded-2xl flex flex-col text-left glass-panel-hover h-[380px]"
              >
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-neutral-900 shrink-0">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug mb-1">
                    {t.title}
                  </h3>
                  <p className="text-neutral-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                    {t.shortDescription}
                  </p>
                  <div className="flex items-center justify-between text-xs mt-auto mb-3 text-neutral-500 font-medium">
                    <span className="text-neutral-300 font-bold">${t.budget}</span>
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                      {t.rating}
                    </span>
                  </div>
                  <Link
                    href={`/items/${t._id}`}
                    className="w-full py-2 rounded-xl text-center text-xs font-semibold text-white bg-neutral-900 border border-neutral-800 hover:border-primary-500 hover:bg-neutral-800 transition-all duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
