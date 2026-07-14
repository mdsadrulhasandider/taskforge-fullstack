import React from 'react';
import { ShieldCheck, Scale, Eye, HelpCircle } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full flex-grow text-left space-y-10">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Privacy Policy & Terms</h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2">Effective Date: July 15, 2026</p>
      </div>

      {/* Intro */}
      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
        TaskForge ("Platform", "we", "our") is dedicated to protecting developer privacy and securing client database records. This document outlines information processing parameters, cookies usage, and structural policies.
      </p>

      {/* Grid Policies */}
      <div className="space-y-8">
        
        <div className="flex space-x-4">
          <div className="p-2 bg-primary-600/10 text-primary-400 rounded-xl h-fit border border-primary-500/20 shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">1. Information We Collect</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We collect credentials (name, email, password) upon account creation. Registered clients additionally input task budget, location specifications, deadlines, and requirements descriptions to populate our MongoDB index.
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="p-2 bg-secondary-600/10 text-secondary-400 rounded-xl h-fit border border-secondary-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">2. Cookies & Secure Authentication</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We utilize JWT (JSON Web Tokens) saved inside HTTP-only secure browser cookies to recognize active login sessions. These cookies are processed strictly to validate route permissions and do not leak behavioral analytical parameters.
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="p-2 bg-accent-600/10 text-accent-400 rounded-xl h-fit border border-accent-500/20 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">3. Escrow Terms & Payout Release</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Contracts posted on TaskForge deposit budget metrics into temporary holding escrows. Funds are locked securely and released to contractors upon milestone code approval. If a dispute occurs, a TaskForge moderator coordinates resolution processes.
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="p-2 bg-neutral-800 text-neutral-400 rounded-xl h-fit border border-neutral-700 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">4. Support & Compliance</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              For security audits, users can request full deletion of accounts and posted deliverables records from our active databases by opening a request on our contact page.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
