
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ResourceInput from './components/ResourceInput';
import ResourceOutput from './components/ResourceOutput';
import { generateResource } from './services/geminiService';

const App: React.FC = () => {
  const [subject, setSubject] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [generatedResource, setGeneratedResource] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || !subject.trim()) {
      setError("Please enter a subject and a description for the resource you want to create.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedResource('');

    try {
      // Create a more structured prompt for better AI results
      const fullPrompt = `Subject: ${subject}\n\nResource Description: ${prompt}`;
      const resource = await generateResource(fullPrompt);
      setGeneratedResource(resource);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, subject]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 font-sans">
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          
          <div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:h-screen">
            <Header />
            <ResourceInput
              subject={subject}
              setSubject={setSubject}
              prompt={prompt}
              setPrompt={setPrompt}
              handleGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          <div className="mt-8 lg:mt-0">
            <ResourceOutput
              resourceText={generatedResource}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
