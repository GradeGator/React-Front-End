"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateAssignment: React.FC = () => {
  const router = useRouter();
  const [assignmentName, setAssignmentName] = useState("");
  const [autoGraderPoints, setAutoGraderPoints] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [lateDueDate, setLateDueDate] = useState("");
  const [enableAnonymous, setEnableAnonymous] = useState(false);
  const [enableManual, setEnableManual] = useState(false);
  const [allowLateSubmissions, setAllowLateSubmissions] = useState(false);
  const [enableGroup, setEnableGroup] = useState(false);
  const [rubric, setRubric] = useState<{ description: string; points: string }[]>([]);

  const addRubricItem = () => {
    setRubric([...rubric, { description: "", points: "" }]);
  };

  const updateRubricItem = (index: number, field: "description" | "points", value: string) => {
    const updatedRubric = rubric.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setRubric(updatedRubric);
  };

  const removeRubricItem = (index: number) => {
    setRubric(rubric.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    router.push("./configure-autograder/page"); // Change "next-page" to the actual route
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Assignment</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Assignment Name *</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Name your assignment"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="checkbox"
            checked={enableAnonymous}
            onChange={() => setEnableAnonymous(!enableAnonymous)}
          />
          <label className="ml-2">Enable anonymous grading</label>
        </div>

        <div>
          <label className="block text-sm font-medium">Autograder Points *</label>
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="e.g. 100"
            value={autoGraderPoints}
            onChange={(e) => setAutoGraderPoints(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Release Date *</label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-2 border rounded-md"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date *</label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-2 border rounded-md"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <input
            type="checkbox"
            checked={allowLateSubmissions}
            onChange={() => setAllowLateSubmissions(!allowLateSubmissions)}
          />
          <label className="ml-2">Allow late submissions</label>
        </div>

        <div>
          <input
            type="checkbox"
            checked={enableManual}
            onChange={() => setEnableManual(!enableManual)}
          />
          <label className="ml-2">Enable manual grading</label>
        </div>

        {enableManual && (
          <div>
            <label className="block text-sm font-medium">Rubric</label>
            {rubric.map((item, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateRubricItem(index, "description", e.target.value)}
                />
                <input
                  type="number"
                  className="w-24 p-2 border rounded-md"
                  placeholder="Points"
                  value={item.points}
                  onChange={(e) => updateRubricItem(index, "points", e.target.value)}
                />
                <button
                  onClick={() => removeRubricItem(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addRubricItem}
              className="mt-2 bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700"
            >
              + Add Rubric Item
            </button>
          </div>
        )}

        <div>
          <input
            type="checkbox"
            checked={enableGroup}
            onChange={() => setEnableGroup(!enableGroup)}
          />
          <label className="ml-2">Enable group submission</label>
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Next
      </button>
    </div>
  );
};

export default CreateAssignment;
