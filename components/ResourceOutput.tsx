
import React, { useState, useRef } from 'react';
import { ShareIcon, MailIcon, PrintIcon, CopyIcon, CheckIcon } from './icons';

interface ResourceOutputProps {
  resourceText: string;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-6 w-1/4"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
  </div>
);

const ResourceOutput: React.FC<ResourceOutputProps> = ({ resourceText, isLoading, error }) => {
  const [isCopied, setIsCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share && resourceText) {
      try {
        await navigator.share({
          title: 'Educational Resource',
          text: resourceText,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    if (resourceText) {
      navigator.clipboard.writeText(resourceText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const handleEmail = () => {
    if (resourceText) {
      const subject = "Educational Resource";
      const body = `Here is the resource you generated:\n\n${resourceText}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const handlePrint = () => {
    window.print();
  };
  
  const hasContent = !isLoading && !error && resourceText;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 no-print">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Generated Resource</h2>
        {hasContent && (
          <div className="flex items-center gap-2">
            <button onClick={handleShare} title={navigator.share ? "Share" : "Copy to Clipboard"} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition">
              {navigator.share ? <ShareIcon /> : (isCopied ? <CheckIcon /> : <CopyIcon />)}
            </button>
            <button onClick={handleEmail} title="Email" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition">
              <MailIcon />
            </button>
            <button onClick={handlePrint} title="Print" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition">
              <PrintIcon />
            </button>
          </div>
        )}
      </div>

      <div id="printable-area" ref={outputRef} className="p-6 overflow-y-auto flex-grow prose dark:prose-invert prose-slate max-w-none">
        {isLoading && <SkeletonLoader />}
        {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 rounded-lg p-4">{error}</div>}
        {!isLoading && !error && !resourceText && (
          <div className="text-center text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center h-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-semibold">Your generated resource will appear here.</p>
            <p className="text-sm">Describe what you need and click "Generate Resource".</p>
          </div>
        )}
        <div className="whitespace-pre-wrap">{resourceText}</div>
      </div>
    </div>
  );
};

export default ResourceOutput;
