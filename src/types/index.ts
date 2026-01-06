
export interface AtsAnalysis {
  score: number;
  criticalIssues: string[];
  formattingTips: string[];
}

export interface SkillGap {
  category: string;
  found: string[];
  missing: string[];
}

export interface ImprovementSuggestion {
  section: string;
  original: string;
  enhanced: string;
  reason: string;
}

export interface AnalysisResult {
  matchScore: number;
  executiveSummary: string;
  ats: AtsAnalysis;
  skills: SkillGap[];
  suggestedImprovements: ImprovementSuggestion[];
  keywordOptimization: string[];
}

export interface HistoryItem {
  id: string;
  date: string;
  jobTitle: string;
  score: number;
  result: AnalysisResult;
}
