import React from "react";
import Sidebar from "../components/Sidebar";

const AssignmentDetail = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Homework 1</h2>
        <div className="mt-4 bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Error Test Cases</h3>
          <div className="mt-2 border p-2 rounded">Test Case 01 - Error Description</div>
          <div className="mt-2 border p-2 rounded">Test Case 10 - Error Description</div>
          <div className="mt-2 border p-2 rounded">Test Case 13 - Error Description</div>
        </div>
        
        <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Passed Test Cases</h3>
          {Array(8).fill("Test Case 13 - Error Description").map((test, index) => (
            <div key={index} className="mt-2 border p-2 rounded">{test}</div>
          ))}
        </div>
      </main>
      
      {/* Status Panel */}
      <aside className="w-64 bg-white p-4 shadow-md ml-4">
        <h3 className="text-lg font-semibold">Status</h3>
        <span className="text-green-600 font-bold">✓ Graded</span>
        <p className="mt-2 text-blue-600 cursor-pointer">View Feedback</p>
        <p className="mt-2 text-blue-600 cursor-pointer">View Grade</p>
      </aside>
    </div>
  );
};

export default AssignmentDetail;