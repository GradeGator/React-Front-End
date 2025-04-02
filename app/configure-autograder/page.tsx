"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const NextPage: React.FC = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assignmentData, setAssignmentData] = useState<any>(null);

  // Load assignment data from sessionStorage (assuming it's stored from the previous page)
  useEffect(() => {
    const storedData = sessionStorage.getItem("assignmentData");
    if (storedData) {
      setAssignmentData(JSON.parse(storedData));
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a ZIP file before uploading.");
      return;
    }

    console.log("Uploading file:", selectedFile.name);
    alert(`File "${selectedFile.name}" selected.`);
  };

  const handleCreate = async () => {
    if (!assignmentData || !selectedFile) {
      alert("Ensure assignment details and ZIP file are selected.");
      return;
    }

    const formData = new FormData();
    formData.append("assignmentName", assignmentData.assignmentName);
    formData.append("autoGraderPoints", assignmentData.autoGraderPoints);
    formData.append("releaseDate", assignmentData.releaseDate);
    formData.append("dueDate", assignmentData.dueDate);
    formData.append("lateDueDate", assignmentData.lateDueDate);
    formData.append("enableAnonymous", assignmentData.enableAnonymous);
    formData.append("enableManual", assignmentData.enableManual);
    formData.append("allowLateSubmissions", assignmentData.allowLateSubmissions);
    formData.append("enableGroup", assignmentData.enableGroup);
    formData.append("enableLeaderboard", assignmentData.enableLeaderboard);
    formData.append("rubric", JSON.stringify(assignmentData.rubric));
    formData.append("autograderFile", selectedFile);

    try {
      const response = await fetch("https://your-api.com/assignments", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Assignment created successfully!");
        router.push("/assignments"); // Redirect to assignments list or dashboard
      } else {
        alert("Failed to create assignment.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("An error occurred while creating the assignment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Upload Autograder</h1>
      <p className="mb-4">Upload a ZIP file to be used as the autograder.</p>

      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 border rounded-lg cursor-pointer"
      />

      {selectedFile && (
        <p className="mb-4 text-green-600">Selected file: {selectedFile.name}</p>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => router.back()}
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Back
        </button>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <button
        onClick={handleCreate}
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Create Assignment
      </button>
    </div>
  );
};

export default NextPage;

