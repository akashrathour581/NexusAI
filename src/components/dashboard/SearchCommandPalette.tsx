import React, { useState, useEffect } from 'react';
import { Search, X, Folder, CheckSquare, Sparkles, ArrowRight } from 'lucide-react';
import type { ProjectCardData, TaskItemData } from '../../types/dashboard';

interface SearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectCardData[];
  tasks: TaskItemData[];
}

export const SearchCommandPalette: React.FC<SearchCommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  tasks,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.client.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.client.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-blue-500" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, documents, tasks or ask AI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results list */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* AI Suggestion */}
          {query.trim().length > 0 && (
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                  Ask AI: "{query}"
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {/* Projects */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Projects ({filteredProjects.length})
            </h4>
            <div className="space-y-1">
              {filteredProjects.length === 0 ? (
                <p className="text-xs text-slate-400 px-3 py-1">No matching projects found</p>
              ) : (
                filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Folder className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{p.title}</span>
                      <span className="text-[11px] text-slate-400">({p.client})</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {p.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Tasks ({filteredTasks.length})
            </h4>
            <div className="space-y-1">
              {filteredTasks.length === 0 ? (
                <p className="text-xs text-slate-400 px-3 py-1">No matching tasks found</p>
              ) : (
                filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t.title}</span>
                      <span className="text-[11px] text-slate-400">• {t.client}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{t.dueDate}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrows</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
