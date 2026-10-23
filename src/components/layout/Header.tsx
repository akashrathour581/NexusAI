import React, { useState } from 'react';
import { Search, Bell, Sun, Menu, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import type { UserProfile } from '../../types/dashboard';

import { useToast } from '../../context/ToastContext';

interface HeaderProps {
  user: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenSearch: () => void;
  onToggleMobileSidebar: () => void;
  onNavigate?: (tab: string) => void;
  onOpenUpgrade?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  darkMode,
  setDarkMode,
  onOpenSearch,
  onToggleMobileSidebar,
  onNavigate,
  onOpenUpgrade,
}) => {
  const { info } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 dark:bg-[#0c1424]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 md:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar matching screenshot */}
        <div 
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-all shadow-xs group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-sm font-normal text-slate-400 dark:text-slate-400 flex-1 truncate">
            Search projects, documents, tasks or ask AI...
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-2xs">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Right Actions: Notifications, Theme, User */}
      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              if (showNotifications) setUnreadCount(0);
            }}
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                <span className="text-[11px] font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => setUnreadCount(0)}>
                  Mark all read
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/60">
                <div className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex gap-3 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">TechBuild Inc. signed contract</p>
                    <p className="text-slate-400 mt-0.5">2 hours ago</p>
                  </div>
                </div>
                <div className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex gap-3 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">AI analysis ready for review</p>
                    <p className="text-slate-400 mt-0.5">3 hours ago</p>
                  </div>
                </div>
                <div className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex gap-3 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Proposal deadline approaching</p>
                    <p className="text-slate-400 mt-0.5">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all"
          aria-label="Toggle theme"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Sun className={`w-5 h-5 transition-transform ${darkMode ? 'text-amber-400 rotate-45' : 'text-slate-600'}`} />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all text-left"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {user.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                {user.role}
              </span>
            </div>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.email}</p>
              </div>
              <div className="py-1 text-sm text-slate-700 dark:text-slate-200">
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onNavigate) onNavigate('settings');
                  }} 
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Your Profile
                </button>
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onNavigate) onNavigate('settings');
                  }} 
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Account Settings
                </button>
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onOpenUpgrade) onOpenUpgrade();
                  }} 
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Billing & Plans
                </button>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                <button 
                  onClick={() => {
                    setShowUserMenu(false);
                    info('Signed Out', 'You have been signed out of your session.');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
