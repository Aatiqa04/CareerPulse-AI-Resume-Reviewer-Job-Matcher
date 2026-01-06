import React from 'react';

interface ResumeFile {
  data: string;
  name: string;
  mimeType: string;
}

interface AnalyzerTabProps {
  resumeText: string;
  resumeFile: ResumeFile | null;
  jobDescription: string;
  error: string | null;
  loading: boolean;
  onResumeTextChange: (text: string) => void;
  onResumeFileChange: (file: ResumeFile | null) => void;
  onJobDescriptionChange: (text: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, target: 'resume' | 'job') => void;
  onAnalyze: () => void;
}

const AnalyzerTab: React.FC<AnalyzerTabProps> = ({
  resumeText,
  resumeFile,
  jobDescription,
  error,
  loading,
  onResumeTextChange,
  onResumeFileChange,
  onJobDescriptionChange,
  onFileUpload,
  onAnalyze,
}) => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-fadeInUp">
      <div className="text-center space-y-4">
        <span className="px-4 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-indigo-100">
          AI-Powered Career Engine
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Optimize your resume for <br /> the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
            perfect job match.
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Upload your resume in PDF or Text format. We'll identify skill gaps, keyword opportunities, and ATS formatting issues in seconds.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 flex items-center gap-3 rounded-2xl animate-shake">
          <i className="fas fa-circle-exclamation text-red-500"></i>
          <p className="text-red-700 text-sm font-semibold">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Resume Input Area */}
        <div className="group space-y-4">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center text-[10px] font-bold">
                1
              </div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">RESUME SOURCE</label>
            </div>
            <label className="group relative flex items-center gap-2 cursor-pointer transition-all">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <i className="fas fa-file-pdf mr-1.5"></i> {resumeFile ? 'CHANGE PDF' : 'UPLOAD PDF/TXT'}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".txt,.pdf"
                onChange={(e) => onFileUpload(e, 'resume')}
              />
            </label>
          </div>

          {resumeFile ? (
            <div className="h-80 w-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-indigo-200 rounded-3xl group-hover:border-indigo-400 transition-all p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                <i className="fas fa-file-pdf"></i>
              </div>
              <div>
                <p className="text-slate-900 font-bold truncate max-w-xs">{resumeFile.name}</p>
                <p className="text-slate-400 text-xs font-medium">Ready for AI processing</p>
              </div>
              <button
                onClick={() => onResumeFileChange(null)}
                className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
              >
                Remove File
              </button>
            </div>
          ) : (
            <textarea
              className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all resize-none text-slate-600 font-medium text-sm leading-relaxed"
              placeholder="Paste your resume text here, or use the button above to upload a PDF..."
              value={resumeText}
              onChange={(e) => onResumeTextChange(e.target.value)}
            />
          )}
        </div>

        {/* Job Description Area */}
        <div className="group space-y-4">
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-md flex items-center justify-center text-[10px] font-bold">
                2
              </div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">JOB TARGET</label>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all">
                <i className="fas fa-paste mr-1.5"></i> PASTE TEXT
              </span>
            </label>
          </div>
          <textarea
            className="w-full h-80 p-6 bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all resize-none text-slate-600 font-medium text-sm leading-relaxed"
            placeholder="Paste the target job description here..."
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center pb-10">
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="group relative px-12 py-5 bg-slate-900 rounded-full font-black text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-indigo-200 flex items-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 flex items-center gap-3 tracking-widest text-xs">
            <i className="fas fa-bolt-lightning text-amber-400"></i> START ANALYSIS
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnalyzerTab;
