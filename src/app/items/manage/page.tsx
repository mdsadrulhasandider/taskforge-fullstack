'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  Settings, Trash2, Eye, ShieldAlert, CheckCircle2, 
  DollarSign, Briefcase, Plus, AlertCircle, RefreshCw
} from 'lucide-react';
import { Task } from '@/types';

export default function ManageTasks() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load tasks posted by current client (or all tasks if demo admin)
  const fetchMyTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      
      if (data.tasks) {
        // If client, show only their tasks. If freelancer, let them see/manage tasks (or filter based on email)
        if (user?.role === 'client') {
          const myTasks = data.tasks.filter((t: Task) => t.clientEmail === user.email);
          setTasks(myTasks);
        } else {
          // Fallback: show all tasks in mock space
          setTasks(data.tasks);
        }
      }
    } catch (err: any) {
      console.error('Error fetching manage list:', err);
      setError('Could not establish database connection.');
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyTasks();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this task listing from the database?')) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to delete task.');
      } else {
        setSuccess('Task deleted successfully!');
        // Update list
        setTasks((prev) => prev.filter((t) => t._id !== id));
        setTimeout(() => setSuccess(''), 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Server error occurred.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-neutral-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full flex-grow text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-neutral-900 pb-5">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center">
            <Settings className="w-8 h-8 mr-2 text-primary-500" />
            Manage Listings Workspace
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            {user.role === 'client' 
              ? `Workspace tracking active job contracts posted by ${user.name}.` 
              : 'Administrative catalog directory of all platform tasks.'}
          </p>
        </div>

        {user.role === 'client' && (
          <Link
            href="/items/add"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold text-xs uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Task</span>
          </Link>
        )}
      </div>

      {/* Feedbacks */}
      {error && (
        <div className="flex items-center space-x-2 p-3.5 bg-rose-955/30 border border-rose-900/50 text-rose-400 text-xs rounded-xl mb-6 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 p-3.5 bg-accent-955/20 border border-accent-900/50 text-accent-400 text-xs rounded-xl mb-6 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Database Listing Panel */}
      {loadingTasks ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-full skeleton-bg rounded-xl"></div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 flex flex-col items-center">
          <div className="p-4 bg-neutral-900 rounded-full text-neutral-600">
            <Briefcase className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold text-white">No Posted Tasks Found</h3>
          <p className="text-sm text-neutral-400 max-w-sm">
            {user.role === 'client' 
              ? 'You have not deployed any task escrow contracts. Create a task to hire certified freelancers.' 
              : 'No tasks currently exist in the database.'}
          </p>
          {user.role === 'client' && (
            <Link 
              href="/items/add" 
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-semibold text-white"
            >
              Post your first task
            </Link>
          )}
        </div>
      ) : (
        /* Table Layout (responsive card layouts on mobile) */
        <div className="glass-panel rounded-2xl overflow-hidden border border-neutral-850">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-900">
              <thead className="bg-neutral-900/60">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Task Details
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Budget
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Work Type
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 bg-neutral-950/20 text-left">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-neutral-900/40 transition-colors">
                    {/* Title & Client */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-900">
                          <img src={task.image} alt={task.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate max-w-[240px]">
                          <span className="text-sm font-semibold text-white block truncate">{task.title}</span>
                          <span className="text-[11px] text-neutral-500 truncate block">Client: {task.clientName}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-primary-400">
                        {task.category}
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-neutral-200">
                      <span className="flex items-center">
                        <DollarSign className="w-3.5 h-3.5 text-accent-500" />
                        {task.budget}
                      </span>
                    </td>

                    {/* Work Type */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-neutral-400 font-medium">
                      {task.location}
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        task.priority === 'high' 
                          ? 'text-rose-400' 
                          : task.priority === 'medium' 
                            ? 'text-amber-400' 
                            : 'text-neutral-400'
                      }`}>
                        {task.priority}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/items/${task._id}`}
                          className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-primary-500 text-neutral-400 hover:text-white transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        
                        {(user.role === 'client' || task.clientEmail === user.email) && (
                          <button
                            onClick={() => handleDelete(task._id!)}
                            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-rose-950/40 hover:border-rose-500 text-neutral-400 hover:text-rose-400 transition-all"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
