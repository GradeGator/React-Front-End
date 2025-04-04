"use client";

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const FeedbackPage = () => {
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const codeLines = [
    { line: 2, text: 'console.log("Test message");' },
    { line: 6, text: 'function updateGutters(cm) {' },
    { line: 7, text: '  var gutters = cm.display.gutters;' },
    { line: 12, text: '  for (var i = 0; i < specs.length; ++i) {' },
  ];

  const feedback = [
    { id: 1, line: 2, text: 'Consider using a more descriptive log message.' },
    { id: 2, line: 6, text: 'Function name should be more meaningful.' },
    { id: 3, line: 7, text: 'Use const instead of var for variable declaration.' },
    { id: 4, line: 12, text: 'Refactor this loop to improve readability.' },
  ];

  const handleCheck = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 p-6">
        {/* Code Display */}
        <div className="w-2/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Homework 1</h2>
          <pre className="text-sm">
            {codeLines.map((line) => (
              <div
                key={line.line}
                className={`p-1 rounded ${highlightedLine === line.line ? 'bg-yellow-200' : ''}`}
              >
                {line.line}: {line.text}
              </div>
            ))}
          </pre>
        </div>
        
        {/* Feedback Panel */}
        <div className="w-1/3 ml-4 p-4 bg-gray-200 rounded-lg">
          <h2 className="font-semibold text-lg">Feedback</h2>
          {feedback.map((item) => (
            <div 
              key={item.id} 
              className="p-2 my-2 bg-white rounded shadow flex justify-between items-center"
            >
              <p className={`text-sm ${checkedItems[item.id] ? '' : 'blur-sm'}`} onClick={() => checkedItems[item.id] && setHighlightedLine(item.line)}>
                Line {item.line}: {item.text}
              </p>
              <button 
                className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                onClick={(e) => { e.stopPropagation(); handleCheck(item.id); }}
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;