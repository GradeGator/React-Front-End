"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const NextPage: React.FC = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assignmentData, setAssignmentData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load assignment data from sessionStorage (assuming it's stored from the previous page)
  useEffect(() => {
    const storedData = sessionStorage.getItem("assignmentData");
    if (storedData) {
      setAssignmentData(JSON.parse(storedData));
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      // Validate file type
      if (!file.name.endsWith('.zip')) {
        setErrorMessage("Please select a ZIP file.");
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size exceeds 10MB limit.");
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a ZIP file before uploading.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate file upload with progress
      // In a real implementation, you would use FormData and fetch with a proper API endpoint
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }
      
      // Simulate successful upload
      console.log("File uploaded successfully:", selectedFile.name);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreate = async () => {
    if (!assignmentData) {
      setErrorMessage("Assignment data is missing. Please go back and try again.");
      return;
    }
    
    if (!selectedFile) {
      setErrorMessage("Please select a ZIP file before creating the assignment.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
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
      formData.append("rubric", JSON.stringify(assignmentData.rubric));
      formData.append("autograderFile", selectedFile);

      // Simulate API call with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      // In a real implementation, you would use:
      // const response = await fetch("https://your-api.com/assignments", {
      //   method: "POST",
      //   body: formData,
      // });
      
      // Simulate successful response
      const response = { ok: true };

      if (response.ok) {
        alert("Assignment created successfully!");
        // Navigate back to the course page using the courseId from sessionStorage
        const courseId = assignmentData.courseId;
        if (courseId) {
          router.push(`/course/${courseId}`);
        } else {
          router.push("/dashboard"); // Fallback to dashboard if courseId is not available
        }
      } else {
        setErrorMessage("Failed to create assignment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setErrorMessage("An error occurred while creating the assignment.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Upload Autograder</h1>
      <p className="mb-4">Upload a ZIP file to be used as the autograder.</p>

      <div className="mb-4">
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border rounded-lg cursor-pointer"
          disabled={isUploading}
        />
        <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {selectedFile && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700">Selected file: {selectedFile.name}</p>
          <p className="text-sm text-green-600">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      {isUploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">
            {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Processing...'}
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => router.back()}
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          disabled={isUploading}
        >
          Back
        </button>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload file'}
        </button>
      </div>

      <button
        onClick={handleCreate}
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-300"
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? 'Creating Assignment...' : 'Create Assignment'}
      </button>
    </div>
  );
};

export default NextPage;

