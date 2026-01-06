
import React from 'react';
import { SkillGap } from '../types';

interface SkillGridProps {
  skills: SkillGap[];
}

const SkillGrid: React.FC<SkillGridProps> = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skillGroup, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
            <i className="fas fa-microchip text-blue-500"></i>
            {skillGroup.category}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Matching Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillGroup.found.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-sm rounded-md border border-green-100 flex items-center gap-1">
                    <i className="fas fa-check-circle text-[10px]"></i> {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {/* Corrected duplicate text "Missing / Missing Skills" to "Missing Skills" */}
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Missing Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillGroup.missing.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-sm rounded-md border border-red-100 flex items-center gap-1">
                    <i className="fas fa-times-circle text-[10px]"></i> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
