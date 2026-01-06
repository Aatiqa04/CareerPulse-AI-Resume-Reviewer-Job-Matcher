
import OpenAI from "openai";
import { AnalysisResult } from "../types";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface ResumeInput {
  text?: string;
  file?: {
    data: string; // base64
    mimeType: string;
  };
}

/**
 * Extracts text from a PDF file (base64 encoded)
 */
async function extractTextFromPdf(base64Data: string): Promise<string> {
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
}

/**
 * Analyzes resume (Text or PDF) against a job description using OpenAI.
 * Uses GPT-4o for advanced document reasoning.
 */
export const analyzeResume = async (resume: ResumeInput, jobDescription: string): Promise<AnalysisResult> => {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    dangerouslyAllowBrowser: true
  });

  let resumeText: string;

  if (resume.file) {
    // Extract text from PDF
    resumeText = await extractTextFromPdf(resume.file.data);
  } else if (resume.text) {
    resumeText = resume.text;
  } else {
    throw new Error("No resume content provided.");
  }

  const systemPrompt = `You are an expert career advisor and ATS (Applicant Tracking System) specialist.
Analyze resumes against job descriptions and provide detailed, actionable feedback.
Always respond with valid JSON matching the exact schema requested.`;

  const userPrompt = `Analyze the following Resume against the Job Description provided.

Resume Content:
${resumeText}

Job Description:
${jobDescription}

Perform a deep analysis including:
1. Overall match score (0-100).
2. ATS compatibility (check for complex formatting issues, headers, contact info, etc.).
3. Detailed skill gap analysis (Categorize technical skills, soft skills, and tools).
4. Provide specific rewritten bullet points or sections for the resume to better match this job.
5. List high-impact keywords found in the job description that are missing from the resume.

Respond with a JSON object with this exact structure:
{
  "matchScore": <number 0-100>,
  "executiveSummary": "<string: brief overview of the candidate's fit>",
  "ats": {
    "score": <number 0-100>,
    "criticalIssues": ["<string>", ...],
    "formattingTips": ["<string>", ...]
  },
  "skills": [
    {
      "category": "<string: e.g., Technical Skills, Soft Skills, Tools>",
      "found": ["<string>", ...],
      "missing": ["<string>", ...]
    }
  ],
  "suggestedImprovements": [
    {
      "section": "<string: section name>",
      "original": "<string: original text or description>",
      "enhanced": "<string: improved version>",
      "reason": "<string: why this change helps>"
    }
  ],
  "keywordOptimization": ["<string: missing keywords>", ...]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4096
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error("Invalid response received from the AI model.");
  }

  try {
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse OpenAI response:", error);
    throw new Error("Invalid analysis format received from AI.");
  }
};
