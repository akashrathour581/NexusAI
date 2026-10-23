import React, { useState, useEffect } from 'react';
import { X, Crown, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface UpgradeProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeProModal: React.FC<UpgradeProModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { success } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPlan = (planName: string) => {
    setLoadingPlan(planName);
    setTimeout(() => {
      setLoadingPlan(null);
      success('Subscription Updated!', `You have upgraded to the ${planName} plan (${billingCycle}).`);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
    >
      <div 
        className="w-full max-w-4xl bg-white dark:bg-[#0c1424] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-blue-50/60 dark:from-blue-950/20 to-transparent border-b border-slate-100 dark:border-slate-800/80 text-center">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-3 border border-amber-500/20">
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>Scale Your Intelligence</span>
          </div>

          <h2 id="upgrade-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Unlock Full NexusAI Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
            Get unlimited AI copilot queries, higher automation limits, and advanced team workspaces.
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="mt-5 inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual billing</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Free Starter */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Starter</h3>
              <p className="text-xs text-slate-400 mt-1">For individuals and small tests</p>
              
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>50 AI Queries / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Up to 3 Active Projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>5GB Cloud Document Storage</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400 line-through">
                  <span>Custom AI Automations</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-400 cursor-not-allowed text-center"
            >
              Current Plan
            </button>
          </div>

          {/* Pro (Highlighted) */}
          <div className="relative rounded-2xl border-2 border-blue-600 bg-white dark:bg-[#0f172a] p-6 flex flex-col justify-between shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Pro Workspace</h3>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-slate-400 mt-1">For high-velocity business teams</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ${billingCycle === 'yearly' ? '23' : '29'}
                </span>
                <span className="text-xs text-slate-400">/ user / mo</span>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Unlimited</strong> AI Copilot queries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Unlimited Projects & Tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>100GB Document Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>25 Automated AI Workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Team collaboration & roles</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Pro Workspace')}
              disabled={loadingPlan !== null}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              {loadingPlan === 'Pro Workspace' ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Upgrade to Pro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Enterprise</h3>
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-slate-400 mt-1">For multi-team organizations</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ${billingCycle === 'yearly' ? '79' : '99'}
                </span>
                <span className="text-xs text-slate-400">/ user / mo</span>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Everything in Pro Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Dedicated AI fine-tuned models</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Custom SAML SSO & Audit Logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>24/7 Priority SLA & Dedicated Rep</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('Enterprise')}
              disabled={loadingPlan !== null}
              className="mt-6 w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {loadingPlan === 'Enterprise' ? (
                <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Contact Enterprise</span>
              )}
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span>🔒 256-bit SSL encrypted checkout. Cancel anytime.</span>
          <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
            View full feature comparison table →
          </span>
        </div>
      </div>
    </div>
  );
};
