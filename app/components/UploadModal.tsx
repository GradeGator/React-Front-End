"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentName: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, assignmentName }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log("Uploading file:", selectedFile);
    onClose();
    router.push("/submitted-autograder");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Assignment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{assignmentName}</p>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-2">
              <p className="text-green-600">Selected file: {selectedFile.name}</p>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
              <label className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600">
                Browse Files
                <input type="file" className="hidden" onChange={handleFileSelect} />
              </label>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-lg ${
              selectedFile ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;