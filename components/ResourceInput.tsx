
import React from 'react';
import { SparklesIcon } from './icons';

interface ResourceInputProps {
  subject: string;
  setSubject: (subject: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGenerate: () => void;
  isLoading: boolean;
}

const ResourceInput: React.FC<ResourceInputProps> = ({ subject, setSubject, prompt, setPrompt, handleGenerate, isLoading }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full">
      <div className="mb-4">
        <label htmlFor="resource-subject" className="block text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">
          Subject
        </label>
        <input
          id="resource-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., Grade 9 Chemistry"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="resource-prompt" className="block text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">
          Describe the resource you need
        </label>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Be as descriptive as possible. Include the topic, grade level, and type of resource (e.g., "a worksheet on the water cycle with 10 fill-in-the-blank questions").
        </p>
        <textarea
          id="resource-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A lesson plan on cellular respiration..."
          className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 resize-none"
          disabled={isLoading}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon />
            Generate Resource
          </>
        )}
      </button>
    </div>
  );
};

export default ResourceInput;
