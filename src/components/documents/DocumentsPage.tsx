import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Users, 
  HardDrive, 
  FolderPlus, 
  Upload, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  Download, 
  Share2, 
  FileCode, 
  FileSpreadsheet, 
  LayoutList, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minus, 
  Plus, 
  FileCheck2, 
  MessageSquare, 
  Folder,
  X
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  ownerName: string;
  ownerAvatar: string;
  modifiedDate: string;
  modifiedTime: string;
  size: string;
  aiAction: 'Summarize' | 'Analyze' | 'Extract Data';
  folder: string;
}

const mockDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Business Strategy Q3.pdf',
    description: 'Company strategy and growth plan',
    type: 'PDF',
    ownerName: 'Akash Rathour',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&q=80',
    modifiedDate: 'Oct 26, 2026',
    modifiedTime: '10:30 AM',
    size: '4.2 MB',
    aiAction: 'Summarize',
    folder: 'Strategy 2026',
  },
  {
    id: 'doc-2',
    name: 'Project Requirements.docx',
    description: 'Detailed technical requirements',
    type: 'DOCX',
    ownerName: 'Priya Sharma',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&fit=crop&q=80',
    modifiedDate: 'Oct 25, 2026',
    modifiedTime: '04:15 PM',
    size: '2.8 MB',
    aiAction: 'Analyze',
    folder: 'Product Specs',
  },
  {
    id: 'doc-3',
    name: 'Sales Data Q3.xlsx',
    description: 'Quarterly sales and revenue data',
    type: 'XLSX',
    ownerName: 'Rahul Mehta',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80',
    modifiedDate: 'Oct 24, 2026',
    modifiedTime: '11:20 AM',
    size: '8.4 MB',
    aiAction: 'Extract Data',
    folder: 'Financials',
  },
  {
    id: 'doc-4',
    name: 'Client Proposal.pdf',
    description: 'Proposal for Acme Corp',
    type: 'PDF',
    ownerName: 'Sneha Kapoor',
    ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&fit=crop&q=80',
    modifiedDate: 'Oct 22, 2026',
    modifiedTime: '02:45 PM',
    size: '5.1 MB',
    aiAction: 'Summarize',
    folder: 'Proposals',
  },
  {
    id: 'doc-5',
    name: 'API Documentation.pdf',
    description: 'API endpoints and integration guide',
    type: 'PDF',
    ownerName: 'Vikram Singh',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&fit=crop&q=80',
    modifiedDate: 'Oct 20, 2026',
    modifiedTime: '09:10 AM',
    size: '3.6 MB',
    aiAction: 'Analyze',
    folder: 'Engineering',
  },
];

export const DocumentsPage: React.FC = () => {
  const { success, info } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [activeTab, setActiveTab] = useState('All Files');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(mockDocuments[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['doc-1']);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activePage, setActivePage] = useState(1);

  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFolder, setUploadFolder] = useState('Contracts');
  const [uploadType, setUploadType] = useState<'PDF' | 'DOCX' | 'XLSX'>('PDF');
  const [newFolderName, setNewFolderName] = useState('');

  const filterTabs = [
    { label: 'All Files', count: `${documents.length}` },
    { label: 'Contracts', count: '124' },
    { label: 'Proposals', count: '86' },
    { label: 'Reports', count: '210' },
    { label: 'Designs', count: '98' },
    { label: 'Shared', count: '320' },
  ];

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: uploadFileName.endsWith(`.${uploadType.toLowerCase()}`) 
        ? uploadFileName 
        : `${uploadFileName}.${uploadType.toLowerCase()}`,
      description: 'Uploaded document with automated AI indexing',
      type: uploadType,
      ownerName: 'Akash Rathour',
      ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&q=80',
      modifiedDate: 'Today',
      modifiedTime: 'Just now',
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      aiAction: uploadType === 'PDF' ? 'Summarize' : uploadType === 'XLSX' ? 'Extract Data' : 'Analyze',
      folder: uploadFolder,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDoc(newDoc);
    success('Document Uploaded Successfully', `"${newDoc.name}" has been indexed and analyzed with AI.`);
    setIsUploadModalOpen(false);
    setUploadFileName('');
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    success('New Folder Created', `Folder "${newFolderName}" is ready for team document storage.`);
    setIsNewFolderModalOpen(false);
    setNewFolderName('');
  };

  const handleAiAction = (action: DocumentItem['aiAction'], doc: DocumentItem) => {
    success(`AI ${action} Completed`, `Generated insights for ${doc.name}.`);
  };

  const handleShare = (doc: DocumentItem) => {
    navigator.clipboard.writeText(`https://app.nexusai.com/docs/${doc.id}`);
    success('Share Link Copied', `Direct access URL for "${doc.name}" copied to clipboard.`);
  };

  const handleDownload = (doc: DocumentItem) => {
    info('Downloading Document', `Preparing ${doc.name} (${doc.size}) for secure download.`);
  };

  const toggleSelectDoc = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getDocTypeIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'PDF':
        return <div className="w-8 h-8 rounded-lg bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">B</div>;
      case 'DOCX':
        return <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">W</div>;
      case 'XLSX':
        return <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">X</div>;
    }
  };

  const getAiActionBadge = (action: DocumentItem['aiAction'], doc: DocumentItem) => {
    switch (action) {
      case 'Summarize':
        return (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAiAction('Summarize', doc);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60 text-xs font-semibold hover:bg-purple-100 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Summarize</span>
          </button>
        );
      case 'Analyze':
        return (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAiAction('Analyze', doc);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Analyze</span>
          </button>
        );
      case 'Extract Data':
        return (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAiAction('Extract Data', doc);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold hover:bg-emerald-100 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Extract Data</span>
          </button>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Documents
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
            Store, organize and analyze your business documents with AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsNewFolderModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FolderPlus className="w-4 h-4 text-slate-500" />
            <span>New Folder</span>
          </button>

          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 active:scale-95 transition-all"
          >
            <Upload className="w-4 h-4 stroke-[2.5]" />
            <span>Upload Documents</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Documents</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">1,248</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 12%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">AI Summaries</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">326</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 28%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Shared With Team</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">84</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 mt-1">
              <span>↑ 18%</span>
              <span className="text-slate-400 font-normal">from last month</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Storage Used</span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                42.8 GB <span className="text-xs font-normal text-slate-400">/ 100 GB</span>
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex-1">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '43%' }} />
            </div>
            <span className="text-[11px] font-bold text-slate-500">43%</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Document Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50">
            <span>Type</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50">
            <span>Owner</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50">
            <span>Date Modified</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden ml-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50">
              <LayoutList className="w-4 h-4" />
            </button>
            <button className="p-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Documents Table */}
      <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 w-10">
                <input type="checkbox" className="rounded-sm" />
              </th>
              <th className="py-3.5 px-4">Name ↑</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Owner</th>
              <th className="py-3.5 px-4">Modified ↓</th>
              <th className="py-3.5 px-4">AI Actions</th>
              <th className="py-3.5 px-4 text-right">···</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
            {documents.map((doc) => {
              const isSelected = selectedDoc.id === doc.id;
              return (
                <tr
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(doc.id)}
                      onChange={() => toggleSelectDoc(doc.id)}
                      className="rounded-sm"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {getDocTypeIcon(doc.type)}
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={doc.ownerAvatar} alt={doc.ownerName} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{doc.ownerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-slate-800 dark:text-slate-200 text-xs">{doc.modifiedDate}</p>
                    <p className="text-[10px] text-slate-400">{doc.modifiedTime}</p>
                  </td>
                  <td className="py-3 px-4">
                    {getAiActionBadge(doc.aiAction, doc)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="p-1 text-slate-300 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Section: Document Preview (Left) & AI Insights / Activity (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Preview Card */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Document Preview</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleDownload(selectedDoc)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button 
                onClick={() => handleShare(selectedDoc)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
              <button 
                onClick={() => info('More Options', `Opening action panel for ${selectedDoc.name}`)}
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Visual Cover Thumbnail */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 relative bg-[#0b1329] text-white p-6 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <span className="font-extrabold text-[10px]">N</span>
                  </div>
                  <span className="font-bold text-xs">NexusAI</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold tracking-tight">Business Strategy</h2>
                  <h3 className="text-lg font-bold text-blue-400">Q3 2026</h3>
                  <p className="text-[10px] text-slate-400">Growth • Innovation • Global Expansion</p>
                </div>

                <div className="w-full h-10 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-lg" />
              </div>

              {/* PDF Viewer pagination controls */}
              <div className="flex items-center justify-between w-full px-2 mt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <button onClick={() => setActivePage((p) => Math.max(1, p - 1))} className="p-1 hover:text-slate-600">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{activePage} / 24</span>
                  <button onClick={() => setActivePage((p) => Math.min(24, p + 1))} className="p-1 hover:text-slate-600">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button onClick={() => setZoomLevel((z) => Math.max(50, z - 10))} className="p-1 hover:text-slate-600">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{zoomLevel}%</span>
                  <button onClick={() => setZoomLevel((z) => Math.min(200, z + 10))} className="p-1 hover:text-slate-600">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 ml-1 hover:text-slate-600">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Metadata Details */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span className="text-slate-900 dark:text-white font-extrabold">{selectedDoc.name}</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Type</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">PDF Document</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Size</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedDoc.size}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Owner</span>
                  <div className="flex items-center gap-2">
                    <img src={selectedDoc.ownerAvatar} alt="" className="w-4 h-4 rounded-full" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedDoc.ownerName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Shared with</span>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&fit=crop&q=80" alt="" className="w-4 h-4 rounded-full ring-1 ring-white" />
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80" alt="" className="w-4 h-4 rounded-full ring-1 ring-white" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">+3 members</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Folder</span>
                  <div className="flex items-center gap-1 font-bold text-blue-600">
                    <Folder className="w-3.5 h-3.5" />
                    <span>{selectedDoc.folder}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Document Insights & Recent AI Activity */}
        <div className="lg:col-span-4 space-y-5">
          {/* AI Document Insights */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Document Insights</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Use AI to understand, analyze and extract value from your documents.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Summarize Document', desc: 'Get a concise summary of key points', icon: FileText, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60' },
                { title: 'Extract Key Information', desc: 'Find important data, entities and dates', icon: FileCheck2, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60' },
                { title: 'Compare Versions', desc: 'Analyze changes between documents', icon: FileSpreadsheet, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
                { title: 'Ask Questions', desc: 'Get answers from your documents with citations', icon: MessageSquare, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60' },
              ].map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.title}
                    className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between group cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">{act.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-all shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent AI Activity */}
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Recent AI Activity
              </h3>
              <button className="text-[11px] font-semibold text-blue-600 hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Summarized Business Strategy Q3.pdf', time: '2 minutes ago', icon: FileText, color: 'text-purple-600 bg-purple-50' },
                { title: 'Extracted data from Sales Data Q3.xlsx', time: '15 minutes ago', icon: FileSpreadsheet, color: 'text-emerald-600 bg-emerald-50' },
                { title: 'Analyzed Client Proposal.pdf', time: '1 hour ago', icon: FileCheck2, color: 'text-amber-600 bg-amber-50' },
                { title: 'Answered question on Project Requirements.docx', time: '3 hours ago', icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-2.5 text-xs">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="upload-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Upload Documents
                  </h3>
                  <p className="text-xs text-slate-400">Add documents and index with automated AI analysis</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Document Title / File Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Financial Overview"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    File Type
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word Document (.docx)</option>
                    <option value="XLSX">Excel Spreadsheet (.xlsx)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Destination Folder
                  </label>
                  <select
                    value={uploadFolder}
                    onChange={(e) => setUploadFolder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Contracts">Contracts</option>
                    <option value="Proposals">Proposals</option>
                    <option value="Reports">Reports</option>
                    <option value="Designs">Designs</option>
                  </select>
                </div>
              </div>

              {/* Drag and Drop Zone Preview */}
              <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-2 bg-slate-50/50 dark:bg-slate-900/30">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Drop files here or click to browse
                </p>
                <p className="text-[11px] text-slate-400">
                  Supported formats: PDF, DOCX, XLSX, TXT (up to 50MB)
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="ai-index" defaultChecked className="rounded text-blue-600" />
                <label htmlFor="ai-index" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  Automatically generate AI executive summary upon ingestion
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Upload & Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {isNewFolderModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="folder-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsNewFolderModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="folder-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Create New Folder
                  </h3>
                  <p className="text-xs text-slate-400">Organize documents into team categories</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewFolderModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Folder Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Legal & Compliance"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

