import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
            <i className="fas fa-sparkles text-white text-[10px]"></i>
          </div>
          <span className="text-slate-900 font-black tracking-tight text-lg">CareerPulse AI</span>
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">Engineered for Career Advancement</p>
        <div className="flex justify-center gap-8 text-slate-300">
          <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-github"></i></a>
          <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-twitter"></i></a>
        </div>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2025 CareerPulse AI Lab • All Systems Active</p>
      </div>
    </footer>
  );
};

export default Footer;
