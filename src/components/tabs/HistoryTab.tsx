import React from 'react';
import { HistoryItem, AnalysisResult } from '../../types';

interface HistoryTabProps {
  history: HistoryItem[];
  onSelectItem: (result: AnalysisResult) => void;
  onNewAnalysis: () => void;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ history, onSelectItem, onNewAnalysis }) => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-fadeInUp">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Portfolio History</h2>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {history.length} Analysis stored
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-24 text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 text-2xl">
            <i className="fas fa-folder-open"></i>
          </div>
          <div className="space-y-2">
            <p className="text-slate-900 font-black text-xl">No historical data found</p>
            <p className="text-slate-500 font-medium">Start your first analysis to see your journey here.</p>
          </div>
          <button
            onClick={onNewAnalysis}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-xs tracking-widest hover:bg-indigo-700 transition-all"
          >
            NEW ANALYSIS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.result)}
              className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fas fa-arrow-right text-indigo-600"></i>
              </div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.date}</span>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-xs font-black text-indigo-600 border border-slate-100">
                  {item.score}%
                </div>
              </div>
              <h4 className="font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                {item.jobTitle}
              </h4>
              <p className="text-xs text-slate-400 font-medium line-clamp-3 mb-6 leading-relaxed">
                {item.result.executiveSummary}
              </p>
              <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                VIEW PROFILE <i className="fas fa-chevron-right text-[8px]"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
