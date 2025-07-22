import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { Loader } from './components/Loader';
import { performCodeReview, ReviewData } from './services/geminiService';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('function helloWorld() {\n  console.log("Hello, World!");\n}');
  const [review, setReview] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const reviewResult = await performCodeReview(code);
      setReview(reviewResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Your Code</h2>
            <CodeInput value={code} onChange={setCode} />
            <button
              onClick={handleReview}
              disabled={isLoading}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Gemini's Feedback</h2>
            <div className="bg-gray-800 rounded-lg p-6 flex-grow border border-gray-700 h-[60vh] overflow-y-auto">
              {isLoading && <Loader />}
              {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
              {review && !isLoading && <ReviewOutput review={review} />}
              {!isLoading && !error && !review && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Submit your code to get a review from Gemini.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;