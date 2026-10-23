import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Users, 
  Video, 
  Sparkles, 
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CalendarEvent {
  id: string;
  title: string;
  date: number; // day of month in Oct 2026
  time: string;
  duration: string;
  type: 'Meeting' | 'Milestone' | 'AI Review' | 'Client Demo';
  color: string;
  badgeBg: string;
  attendees: string[];
  link?: string;
  location?: string;
}

const initialEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Product Design Sprint Review',
    date: 22, // today
    time: '10:00 AM - 11:30 AM',
    duration: '1.5 hrs',
    type: 'Meeting',
    color: 'text-blue-500',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    attendees: ['Alex Morgan', 'Elena Rostova', 'Marcus Chen'],
    link: 'https://meet.google.com/nex-ai-sprint',
  },
  {
    id: 'ev-2',
    title: 'AI Pipeline Latency Optimization',
    date: 22, // today
    time: '02:00 PM - 03:00 PM',
    duration: '1 hr',
    type: 'AI Review',
    color: 'text-purple-500',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
    attendees: ['Alex Morgan', 'Sarah Jenkins'],
    link: 'https://meet.google.com/nex-ai-latency',
  },
  {
    id: 'ev-3',
    title: 'Client Demo: TechBuild Inc.',
    date: 24,
    time: '11:00 AM - 12:00 PM',
    duration: '1 hr',
    type: 'Client Demo',
    color: 'text-emerald-500',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    attendees: ['David Miller', 'Alex Morgan'],
    link: 'https://meet.google.com/tb-demo-live',
  },
  {
    id: 'ev-4',
    title: 'Q4 Enterprise Roadmap Launch',
    date: 28,
    time: 'All Day Milestone',
    duration: 'All Day',
    type: 'Milestone',
    color: 'text-amber-500',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    attendees: ['Entire Company'],
  },
  {
    id: 'ev-5',
    title: 'Weekly Leadership Sync',
    date: 15,
    time: '09:00 AM - 10:00 AM',
    duration: '1 hr',
    type: 'Meeting',
    color: 'text-blue-500',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    attendees: ['Alex Morgan', 'Marcus Chen', 'David Kim'],
  },
];

export const CalendarPage: React.FC = () => {
  const { success, info } = useToast();
  const currentMonth = 'October 2026';
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  // Form states
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState(22);
  const [newEventTime, setNewEventTime] = useState('03:30 PM - 04:30 PM');
  const [newEventType, setNewEventType] = useState<'Meeting' | 'Milestone' | 'AI Review' | 'Client Demo'>('Meeting');
  const [newEventLink, setNewEventLink] = useState('https://meet.google.com/new-meeting');

  // Days in month calculation for October 2026 (Starts on Thursday Oct 1 = 4 empty cells)
  const emptyCells = [0, 1, 2, 3]; // Sun, Mon, Tue, Wed
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const eventBadgeColor = 
      newEventType === 'Meeting' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900' :
      newEventType === 'AI Review' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900' :
      newEventType === 'Client Demo' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900' :
      'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900';

    const newEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      date: Number(newEventDay),
      time: newEventTime,
      duration: '1 hr',
      type: newEventType,
      color: newEventType === 'Meeting' ? 'text-blue-500' : 'text-purple-500',
      badgeBg: eventBadgeColor,
      attendees: ['Alex Morgan', 'Elena Rostova'],
      link: newEventLink,
    };

    setEvents(prev => [...prev, newEvent]);
    success('Event Scheduled', `"${newEventTitle}" added to ${currentMonth}.`);
    setIsNewEventModalOpen(false);
    setNewEventTitle('');
  };

  const selectedDayEvents = events.filter(e => e.date === selectedDay);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span>Schedule & Calendar</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              {events.length} Events
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Coordinate sprints, client executive demos, and AI pipeline milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* AI Smart Schedule Helper */}
          <button 
            onClick={() => info('AI Scheduler', 'AI analyzed team calendars: Optimal free slot found today at 04:00 PM.')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>AI Find Slots</span>
          </button>

          {/* New Event Button */}
          <button
            onClick={() => setIsNewEventModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Controls & Month Picker Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900">
            <button
              onClick={() => info('Navigation', 'Previous Month')}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
              {currentMonth}
            </span>
            <button
              onClick={() => info('Navigation', 'Next Month')}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedDay(22);
              info('Today', 'Navigated to Today: Oct 22, 2026');
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Today
          </button>
        </div>

        {/* View Toggle pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          {(['month', 'week', 'agenda'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all
                ${viewMode === mode
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}
              `}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar Layout: Grid on Left + Selected Day Schedule on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Month Calendar Grid (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-2xs">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Empty prefix cells */}
            {emptyCells.map((val) => (
              <div key={`empty-${val}`} className="min-h-16 sm:min-h-24 p-1.5 rounded-xl bg-slate-50/40 dark:bg-slate-900/30 opacity-40" />
            ))}

            {/* Days in Month */}
            {daysInMonth.map((day) => {
              const dayEvents = events.filter((e) => e.date === day);
              const isToday = day === 22;
              const isSelected = day === selectedDay;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    min-h-16 sm:min-h-24 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between
                    ${isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20' 
                      : 'border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0f172a]'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={`
                      text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center
                      ${isToday 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : isSelected
                        ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                        : 'text-slate-700 dark:text-slate-300'}
                    `}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-400">
                        {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                      </span>
                    )}
                  </div>

                  {/* Micro event pills */}
                  <div className="mt-1 space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[10px] font-semibold truncate px-1.5 py-0.5 rounded-md border ${ev.badgeBg}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] font-semibold text-slate-400 px-1">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda & Upcoming Panel (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Schedule for Oct {selectedDay}, 2026
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'event' : 'events'} scheduled
                </p>
              </div>

              <button
                onClick={() => {
                  setNewEventDay(selectedDay);
                  setIsNewEventModalOpen(true);
                }}
                className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors"
                title="Add event for this day"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 space-y-2.5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ev.badgeBg}`}>
                        {ev.type}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {ev.time}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {ev.title}
                    </h4>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ev.attendees.length} members</span>
                      </div>

                      {ev.link && (
                        <a
                          href={ev.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Video className="w-3 h-3" />
                          <span>Join Meet</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400 space-y-2">
                  <CalendarIcon className="w-8 h-8 mx-auto opacity-30" />
                  <p className="text-xs font-medium">No events scheduled on this date.</p>
                  <button
                    onClick={() => {
                      setNewEventDay(selectedDay);
                      setIsNewEventModalOpen(true);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add New Event
                  </button>
                </div>
              )}
            </div>
          </div>

            {/* Quick AI Scheduling Assistant */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 border border-indigo-500/20 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  AI Schedule Suggestions
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                You have 4 hours of uninterrupted deep work tomorrow morning. Would you like NexusAI to block this time from external bookings?
              </p>
              <button 
                onClick={() => success('Focus Time Blocked', 'Reserved 09:00 AM - 01:00 PM tomorrow as Focus Time.')}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 active:scale-95 transition-all"
              >
                Block Deep Work Slot
              </button>
            </div>
        </div>
      </div>

      {/* New Event Modal */}
      {isNewEventModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsNewEventModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="schedule-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Schedule New Event
                  </h3>
                  <p className="text-xs text-slate-400">Set team invites and Google Meet link</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewEventModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Sprint Demo"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Day in Oct 2026
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newEventDay}
                    onChange={(e) => setNewEventDay(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Event Type
                  </label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="AI Review">AI Review</option>
                    <option value="Client Demo">Client Demo</option>
                    <option value="Milestone">Milestone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Time Window
                </label>
                <input
                  type="text"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Link
                </label>
                <input
                  type="text"
                  value={newEventLink}
                  onChange={(e) => setNewEventLink(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Confirm Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
