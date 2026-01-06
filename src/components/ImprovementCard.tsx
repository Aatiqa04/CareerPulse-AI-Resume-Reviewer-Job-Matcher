
import React, { useState } from 'react';
import { ImprovementSuggestion } from '../types';

interface ImprovementCardProps {
  suggestion: ImprovementSuggestion;
}

const ImprovementCard: React.FC<ImprovementCardProps> = ({ suggestion }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">
          {suggestion.section}
        </span>
        <button 
          onClick={() => setShowFull(!showFull)}
          className="text-slate-400 hover:text-slate-600"
        >
          <i className={`fas fa-chevron-${showFull ? 'up' : 'down'}`}></i>
        </button>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Current Version</h4>
          <p className="text-slate-600 italic text-sm line-through opacity-60">"{suggestion.original}"</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">AI-Enhanced Version</h4>
          <p className="text-slate-900 font-medium text-sm bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            "{suggestion.enhanced}"
          </p>
        </div>
        {showFull && (
          <div className="pt-2 border-t border-slate-100 mt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Why this change?</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{suggestion.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovementCard;
