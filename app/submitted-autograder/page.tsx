"use client"

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";

const AssignmentDetail = () => {
  const [isGraded, setIsGraded] = useState(true);
  const grade = "85%"; // Example grade
  const [expandedSections, setExpandedSections] = useState({});
  const router = useRouter();

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const failedTestCases = [
    "Test Case 01 - Error Description",
    "Test Case 10 - Error Description",
    "Test Case 13 - Error Description",
  ];

  const passedTestCases = Array(8).fill("Test Case 13 - No Errors");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Homework 1</h2>
        
        {/* Failed Test Cases Section */}
        <div className="mt-4 bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-600">Failed Test Cases</h3>
          {failedTestCases.map((test, index) => (
            <div key={index} className="mt-2 border p-2 rounded">
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => toggleSection(`failed-${index}`)}
              >
                {test.split(" - ")[0]} <span>{expandedSections[`failed-${index}`] ? "▼" : "▶"}</span>
              </div>
              {expandedSections[`failed-${index}`] && (
                <div className="mt-2 text-gray-600">{test.split(" - ")[1]}</div>
              )}
            </div>
          ))}
        </div>
        
        {/* Passed Test Cases Section */}
        <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-600">Passed Test Cases</h3>
          {passedTestCases.map((test, index) => (
            <div key={index} className="mt-2 border p-2 rounded">
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => toggleSection(`passed-${index}`)}
              >
                {test.split(" - ")[0]} <span>{expandedSections[`passed-${index}`] ? "▼" : "▶"}</span>
              </div>
              {expandedSections[`passed-${index}`] && (
                <div className="mt-2 text-gray-600">{test.split(" - ")[1]}</div>
              )}
            </div>
          ))}
        </div>
      </main>
      
      {/* Status Panel */}
      <aside className="w-64 bg-white p-4 shadow-md ml-4">
        <h3 className="text-lg font-semibold">Status</h3>
        <button 
          className={`font-bold mt-2 ${isGraded ? 'text-green-600' : 'text-red-600'}`}
          onClick={() => setIsGraded(!isGraded)}
        >
          {isGraded ? "✓ Graded" : "❌ Ungraded"}
        </button>
        
        <p className="mt-4 text-xl font-bold">Grade: {grade}</p>
        
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={() => router.push("/submitted-feedback")}>View Feedback
        </button>
      </aside>
    </div>
  );
};

export default AssignmentDetail;
