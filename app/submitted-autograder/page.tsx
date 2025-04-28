"use client"

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";

interface TestResult {
  testName: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
}

interface AutograderResult {
  status: string;
  output: string;
  passed: boolean;
  total: number;
  failed: number;
  testResults: TestResult[];
}

const AssignmentDetail = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [autograderResult, setAutograderResult] = useState<AutograderResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real application, this would fetch the JSON from an API
    // For now, we'll simulate loading the JSON file
    const loadAutograderResult = async () => {
      try {
        // This is a placeholder for the actual API call
        // In a real application, you would fetch this from your backend
        const response = await fetch('/api/autograder-results');
        const data = await response.json();
        
        // Parse the output string which contains the JSON
        const parsedOutput = JSON.parse(data.output);
        setAutograderResult(parsedOutput);
      } catch (error) {
        console.error("Error loading autograder results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAutograderResult();
  }, []);

  const toggleSection = (index: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Loading autograder results...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!autograderResult) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-red-600">Failed to load autograder results</p>
          </div>
        </main>
      </div>
    );
  }

  const failedTests = autograderResult.testResults.filter(test => !test.passed);
  const passedTests = autograderResult.testResults.filter(test => test.passed);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Autograder Results</h2>
        
        {/* Summary Section */}
        <div className="mt-4 bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Total Tests</p>
              <p className="text-xl font-bold">{autograderResult.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-500">Passed</p>
              <p className="text-xl font-bold text-green-600">{autograderResult.total - autograderResult.failed}</p>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-xl font-bold text-red-600">{autograderResult.failed}</p>
            </div>
          </div>
        </div>
        
        {/* Failed Test Cases Section */}
        {failedTests.length > 0 && (
          <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-red-600">Failed Test Cases</h3>
            {failedTests.map((test, index) => (
              <div key={index} className="mt-2 border p-2 rounded">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => toggleSection(`failed-${index}`)}
                >
                  <span className="font-medium">{test.testName}</span>
                  <span>{expandedSections[`failed-${index}`] ? "▼" : "▶"}</span>
                </div>
                {expandedSections[`failed-${index}`] && (
                  <div className="mt-2 text-gray-600 space-y-2">
                    <div>
                      <span className="font-medium">Input:</span> {test.input}
                    </div>
                    <div>
                      <span className="font-medium">Expected Output:</span> {test.expectedOutput}
                    </div>
                    <div>
                      <span className="font-medium">Actual Output:</span> {test.actualOutput}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Passed Test Cases Section */}
        {passedTests.length > 0 && (
          <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-600">Passed Test Cases</h3>
            {passedTests.map((test, index) => (
              <div key={index} className="mt-2 border p-2 rounded">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => toggleSection(`passed-${index}`)}
                >
                  <span className="font-medium">{test.testName}</span>
                  <span>{expandedSections[`passed-${index}`] ? "▼" : "▶"}</span>
                </div>
                {expandedSections[`passed-${index}`] && (
                  <div className="mt-2 text-gray-600 space-y-2">
                    <div>
                      <span className="font-medium">Input:</span> {test.input}
                    </div>
                    <div>
                      <span className="font-medium">Expected Output:</span> {test.expectedOutput}
                    </div>
                    <div>
                      <span className="font-medium">Actual Output:</span> {test.actualOutput}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Status Panel */}
      <aside className="w-64 bg-white p-4 shadow-md ml-4">
        <h3 className="text-lg font-semibold">Status</h3>
        <button 
          className={`font-bold mt-2 ${autograderResult.passed ? 'text-green-600' : 'text-red-600'}`}
        >
          {autograderResult.passed ? "✓ All Tests Passed" : "❌ Some Tests Failed"}
        </button>
        
        <p className="mt-4 text-xl font-bold">
          Grade: {Math.round((autograderResult.total - autograderResult.failed) / autograderResult.total * 100)}%
        </p>
        
        <button 
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={() => router.push("/submitted-feedback")}
        >
          View Feedback
        </button>
      </aside>
    </div>
  );
};

export default AssignmentDetail;
