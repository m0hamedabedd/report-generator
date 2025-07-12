import React, { useState, useCallback } from 'react';
import type { UserDetails } from '../types';
import { generateReport, refineTopic } from '../services/geminiService';
import { CopyIcon, DownloadIcon, SparklesIcon, WarningIcon, RefreshIcon, DocumentTextIcon, CogIcon } from './icons';
import Spinner from './Spinner';
import { useLanguage } from '../contexts/LanguageContext';
import ReportSettings from './ReportSettings';

interface ReportViewProps {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
  onStartOver: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ userDetails, setUserDetails, onStartOver }) => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [latexCode, setLatexCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [isRefining, setIsRefining] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading || isRefining) return;

    setIsLoading(true);
    setError(null);
    setLatexCode(null);

    try {
      const result = await generateReport(userDetails, topic);
      if (result.startsWith('Error from API:')) {
        setError(result);
        setLatexCode(null);
      } else {
        setLatexCode(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setLatexCode(null);
    } finally {
      setIsLoading(false);
    }
  }, [topic, isLoading, isRefining, userDetails]);

  const handleRefineTopic = useCallback(async () => {
    if (!topic.trim() || isRefining || isLoading) return;

    setIsRefining(true);
    setError(null);

    try {
        const refined = await refineTopic(topic, userDetails.language);
        setTopic(refined);
    } catch (err) {
        setError(err instanceof Error ? `${t('refineErrorPrefix')} ${err.message}` : 'Failed to refine topic.');
    } finally {
        setIsRefining(false);
    }
  }, [topic, isRefining, isLoading, userDetails, t]);

  const handleCopy = () => {
    if (!latexCode) return;
    navigator.clipboard.writeText(latexCode).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setError(t('failedToCopy'));
    });
  };
  
  const handleDownloadTex = () => {
    if (!latexCode) return;
    const blob = new Blob([latexCode], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 space-y-6">
                <div className="bg-white border border-slate-200/50 shadow-lg rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">{t('generationSettingsTitle')}</h3>
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            aria-expanded={isSettingsOpen}
                            aria-controls="report-settings-panel"
                        >
                            <CogIcon className="w-5 h-5"/>
                            <span className="ms-1.5">{isSettingsOpen ? t('hideSettingsButton') : t('showSettingsButton')}</span>
                        </button>
                    </div>

                    {isSettingsOpen && (
                        <div id="report-settings-panel" className="mb-6 animate-fade-in transition-all duration-300">
                            <ReportSettings details={userDetails} setDetails={setUserDetails} />
                        </div>
                    )}
                    
                    <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
                                {t('topicLabel')}
                            </label>
                             <button 
                                type="button" 
                                onClick={handleRefineTopic}
                                disabled={isRefining || isLoading || !topic.trim()}
                                className="flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isRefining ? <Spinner/> : <SparklesIcon className="w-4 h-4"/>}
                                <span className="ms-1">{isRefining ? t('refiningButton') : t('refineButton')}</span>
                            </button>
                        </div>
                        <textarea
                        id="topic"
                        rows={4}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder={t('topicPlaceholder')}
                        className="block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || isRefining || !topic.trim()}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? <Spinner /> : <SparklesIcon className="w-5 h-5"/>}
                        <span className="mx-2">{isLoading ? t('generatingButton') : t('generateButton')}</span>
                    </button>
                    </form>
                </div>
                 <button 
                    onClick={onStartOver}
                    className="w-full flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
                >
                    <RefreshIcon className="w-4 h-4 me-2" />
                    {t('startOverButton')}
                </button>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-7 xl:col-span-8 mt-8 lg:mt-0">
                <div className="bg-white border border-slate-200/50 shadow-lg rounded-xl p-6 min-h-[70vh] flex flex-col">
                    {isLoading ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-slate-500">
                        <Spinner />
                        <p className="mt-4 text-center">{t('generatingStatus')} "{topic}"...</p>
                    </div>
                    ) : error ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-red-600">
                        <WarningIcon />
                        <p className="mt-4 font-semibold">{t('errorTitle')}</p>
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    </div>
                    ) : latexCode ? (
                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">{t('generatedCodeTitle')}</h3>
                        <div className="flex items-center space-x-2">
                            <button onClick={handleCopy} className="flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium text-slate-700 transition-colors">
                            <CopyIcon /> <span className="ms-1.5">{copyStatus === 'copied' ? t('copiedButton') : t('copyButton')}</span>
                            </button>
                            <button onClick={handleDownloadTex} className="flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-md text-sm font-medium text-blue-700 transition-colors">
                            <DownloadIcon /> <span className="ms-1.5">{t('downloadTexButton')}</span>
                            </button>
                        </div>
                        </div>
                        <div className="relative flex-grow">
                        <pre className="absolute inset-0 w-full h-full bg-slate-50 border border-slate-200 rounded-md p-4 text-sm text-slate-700 font-mono overflow-auto" dir="ltr">
                            <code>{latexCode}</code>
                        </pre>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                        <strong>{t('nextStepTitle')}</strong> <span dangerouslySetInnerHTML={{ __html: t('nextStepDesc') }} />
                        </div>
                    </div>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-500 p-8">
                            <DocumentTextIcon className="w-16 h-16 text-slate-300" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-700">{t('emptyStateTitle')}</h3>
                            <p className="mt-1 max-w-sm">{t('emptyStateDesc')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ReportView;