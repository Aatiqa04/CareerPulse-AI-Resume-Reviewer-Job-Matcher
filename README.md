# CareerPulse AI

An AI-powered resume analyzer that helps job seekers optimize their resumes for specific job descriptions. Get instant feedback on ATS compatibility, skill gaps, and actionable improvements.

## Features

- **Resume Analysis** - Upload PDF or paste text resume for AI-powered analysis
- **ATS Compatibility Check** - Identify formatting issues that might trip up Applicant Tracking Systems
- **Skill Gap Analysis** - See which skills you have and which ones you're missing
- **Keyword Optimization** - Discover critical keywords from job descriptions missing in your resume
- **Actionable Improvements** - Get AI-generated suggestions to enhance specific resume sections
- **History Tracking** - Save and review your past analyses (stored locally)

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **AI**: OpenAI GPT-4o
- **PDF Parsing**: PDF.js
- **Charts**: Recharts
- **Styling**: Tailwind CSS

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── tabs/
│   │   ├── AnalyzerTab.tsx
│   │   ├── ResultsTab.tsx
│   │   └── HistoryTab.tsx
│   ├── ImprovementCard.tsx
│   ├── LoadingOverlay.tsx
│   ├── MatchChart.tsx
│   └── SkillGrid.tsx
├── services/
│   └── openaiService.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CareerPulse-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your API key in `.env.local`:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload Resume** - Either upload a PDF file or paste your resume text
2. **Add Job Description** - Paste the target job description
3. **Analyze** - Click "START ANALYSIS" to get AI-powered insights
4. **Review Results** - Check your match score, skill gaps, and improvement suggestions
5. **Track History** - Access previous analyses from the History tab

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required) |

## License

MIT
