
import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-[60vh] flex-grow">
      <textarea
        value={value}
        onChange={handleCodeChange}
        placeholder="Paste your code here..."
        className="w-full h-full p-4 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm leading-relaxed"
        spellCheck="false"
      />
    </div>
  );
};
