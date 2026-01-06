import React from 'react';

type TabType = 'input' | 'results' | 'history';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <i className="fas fa-sparkles text-white text-sm"></i>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            CareerPulse <span className="text-indigo-600">AI</span>
          </h1>
        </div>
        <nav className="flex items-center gap-1 p-1 bg-slate-100/50 rounded-full border border-slate-200/50">
          <button
            onClick={() => onTabChange('input')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${activeTab === 'input' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            ANALYZER
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            HISTORY
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
