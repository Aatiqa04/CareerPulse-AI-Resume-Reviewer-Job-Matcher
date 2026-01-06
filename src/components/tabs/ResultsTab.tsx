import React from 'react';
import { AnalysisResult } from '../../types';
import MatchChart from '../MatchChart';
import SkillGrid from '../SkillGrid';
import ImprovementCard from '../ImprovementCard';

interface ResultsTabProps {
  result: AnalysisResult;
  onRestart: () => void;
}

const ResultsTab = React.forwardRef<HTMLDivElement, ResultsTabProps>(({ result, onRestart }, ref) => {
  return (
    <div ref={ref} className="space-y-14 animate-fadeIn">
      {/* Analysis Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Widget */}
        <div className="lg:col-span-1 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
            Compatibility Index
          </span>
          <MatchChart score={result.matchScore} />
          <div className="mt-4 text-center">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                result.matchScore > 75 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}
            >
              {result.matchScore > 75 ? 'HIRE READY' : 'OPTIMIZATION NEEDED'}
            </span>
          </div>
        </div>

        {/* Executive Insights */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <i className="fas fa-quote-left text-sm"></i>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Executive Insight</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg font-medium italic">
            "{result.executiveSummary}"
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ATS Status</p>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <i className={`fas fa-circle text-[8px] ${result.ats.score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}></i>
                {result.ats.score}% Compliant
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skills Match</p>
              <p className="text-sm font-bold text-slate-900">
                {result.skills.reduce((acc, curr) => acc + curr.found.length, 0)} Found
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Items</p>
              <p className="text-sm font-bold text-indigo-600 underline">
                {result.suggestedImprovements.length} Required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Sections */}
      <div className="space-y-10">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs">
                <i className="fas fa-chart-line"></i>
              </span>
              Technical DNA
            </h3>
          </div>
          <SkillGrid skills={result.skills} />
        </section>

        <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 text-[120px]">
            <i className="fas fa-keyboard"></i>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-3">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">SEO Optimization</span>
                <h3 className="text-3xl font-black tracking-tight">Keyword Deficit</h3>
                <p className="text-slate-400 font-medium max-w-lg">
                  Our AI detected these critical keywords in the job description that are entirely absent from your profile.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {result.keywordOptimization.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-black hover:bg-white/10 hover:border-white/30 transition-all cursor-default text-indigo-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-xs">
              <i className="fas fa-edit"></i>
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Actionable Refinements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.suggestedImprovements.map((improvement, idx) => (
              <ImprovementCard key={idx} suggestion={improvement} />
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-center pb-20 pt-10">
        <button
          onClick={onRestart}
          className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-full font-black text-xs tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
        >
          RESTART ANALYZER
        </button>
      </div>
    </div>
  );
});

ResultsTab.displayName = 'ResultsTab';

export default ResultsTab;
