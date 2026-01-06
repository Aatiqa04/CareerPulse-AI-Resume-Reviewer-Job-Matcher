import React, { useState, useEffect, useRef } from 'react';
import { analyzeResume, ResumeInput } from './services/openaiService';
import { AnalysisResult, HistoryItem } from './types';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// UI components
import LoadingOverlay from './components/LoadingOverlay';

// Tab components
import AnalyzerTab from './components/tabs/AnalyzerTab';
import ResultsTab from './components/tabs/ResultsTab';
import HistoryTab from './components/tabs/HistoryTab';

type TabType = 'input' | 'results' | 'history';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<{ data: string; name: string; mimeType: string } | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('input');

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('resumeHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (res: AnalysisResult) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      jobTitle: jobDescription.split('\n')[0].substring(0, 50) || 'Job Opportunity',
      score: res.matchScore,
      result: res,
    };
    const updatedHistory = [newItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'resume' | 'job') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (target === 'resume' && file.type === 'application/pdf') {
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setResumeFile({ data: base64, name: file.name, mimeType: file.type });
        setResumeText('');
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (target === 'resume') {
          setResumeText(text);
          setResumeFile(null);
        } else {
          setJobDescription(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const runAnalysis = async () => {
    const hasResume = resumeText.trim() || resumeFile;
    if (!hasResume || !jobDescription.trim()) {
      setError('Please provide both a resume (Text/PDF) and a job description.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const input: ResumeInput = resumeFile
        ? { file: { data: resumeFile.data, mimeType: resumeFile.mimeType } }
        : { text: resumeText };

      const analysisResult = await analyzeResume(input, jobDescription);
      setResult(analysisResult);
      saveToHistory(analysisResult);
      setActiveTab('results');
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during analysis.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (selectedResult: AnalysisResult) => {
    setResult(selectedResult);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[120px]"></div>
      </div>

      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {loading && <LoadingOverlay />}

        {activeTab === 'input' && (
          <AnalyzerTab
            resumeText={resumeText}
            resumeFile={resumeFile}
            jobDescription={jobDescription}
            error={error}
            loading={loading}
            onResumeTextChange={setResumeText}
            onResumeFileChange={setResumeFile}
            onJobDescriptionChange={setJobDescription}
            onFileUpload={handleFileUpload}
            onAnalyze={runAnalysis}
          />
        )}

        {activeTab === 'results' && result && (
          <ResultsTab
            ref={resultsRef}
            result={result}
            onRestart={() => setActiveTab('input')}
          />
        )}

        {activeTab === 'history' && (
          <HistoryTab
            history={history}
            onSelectItem={handleHistorySelect}
            onNewAnalysis={() => setActiveTab('input')}
          />
        )}
      </main>

      <Footer />

      {/* Global Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default App;
