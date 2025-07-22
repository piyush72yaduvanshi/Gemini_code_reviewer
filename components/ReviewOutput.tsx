import React from 'react';
import { ReviewData, ReviewSection } from '../services/geminiService';

// --- Icon Components ---

const SummaryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

const BugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const StyleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
);

const PerformanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);

const SuggestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);


const getCategoryTheme = (category: string) => {
    switch (category) {
        case 'Overall Summary':
            return { icon: <SummaryIcon />, color: 'text-sky-400' };
        case 'Potential Bugs':
            return { icon: <BugIcon />, color: 'text-red-400' };
        case 'Style & Readability':
            return { icon: <StyleIcon />, color: 'text-purple-400' };
        case 'Performance':
            return { icon: <PerformanceIcon />, color: 'text-yellow-400' };
        case 'Best Practices & Suggestions':
            return { icon: <SuggestionIcon />, color: 'text-green-400' };
        default:
            return { icon: <SummaryIcon />, color: 'text-gray-400' };
    }
};

const Section: React.FC<{ section: ReviewSection }> = ({ section }) => {
    const { icon, color } = getCategoryTheme(section.category);

    if (section.feedback.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700/50 transition-all hover:border-gray-600">
            <h3 className={`flex items-center space-x-3 text-lg font-semibold ${color}`}>
                {icon}
                <span>{section.category}</span>
            </h3>
            <div className="mt-3 pl-9 text-gray-300 space-y-2 text-sm">
                {section.category === 'Overall Summary' ? (
                     <p className="leading-relaxed">{section.feedback.join(' ')}</p>
                ) : (
                    <ul className="list-disc list-outside space-y-2">
                        {section.feedback.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};


interface ReviewOutputProps {
  review: ReviewData;
}

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review }) => {
  return (
    <div className="animate-fade-in">
        {review.reviewSections.map((section, index) => (
            <Section key={index} section={section} />
        ))}
    </div>
  );
};