import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fadeIn">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fas fa-brain text-indigo-600 animate-pulse text-xl"></i>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">CareerPulse AI is analyzing...</h3>
      <div className="flex flex-col items-center gap-1">
        <p className="text-slate-500 animate-pulse">Extracting skills & checking ATS rules</p>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
