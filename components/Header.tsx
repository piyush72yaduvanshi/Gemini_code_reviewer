
import React from 'react';

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                <CodeIcon />
                <h1 className="text-2xl font-bold text-white">
                    Gemini Code Reviewer
                </h1>
            </div>
            <p className="hidden md:block text-gray-400">Your AI-powered pair programmer</p>
        </div>
      </div>
    </header>
  );
};
