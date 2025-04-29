"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFunctions } from "@/lib/api";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentName: string;
  assignmentId: number;
  studentId: number;
}

const UploadModal: React.FC<UploadModalProps> = ({ 
  isOpen, 
  onClose, 
  assignmentName,
  assignmentId,
  studentId
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    // Add file validation here if needed (size, type, etc.)
    const maxSize = 50 * 1024 * 1024; // 50MB max size
    if (file.size > maxSize) {
      setError("File size must be less than 50MB");
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setError(null);

    try {
      console.log('Starting file upload with data:', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        studentId,
        assignmentId
      });

      await apiFunctions.uploadSubmission({
        submission_file: selectedFile,
        student: studentId,
        assignment: assignmentId
      });
      
      console.log('File upload completed successfully');
      onClose();
      router.refresh();
    } catch (error: unknown) {
      // Type guard for axios error
      interface AxiosError {
        response?: {
          status?: number;
          data?: {
            detail?: string;
            error?: string;
            message?: string;
          };
        };
        message?: string;
        name?: string;
        code?: string;
      }

      const err = error as Error & AxiosError;
      
      // Log each piece of error information separately
      console.error('Upload Error:');
      console.error('- Name:', err.name);
      console.error('- Message:', err.message);
      console.error('- Status:', err.response?.status);
      console.error('- Response Data:', JSON.stringify(err.response?.data, null, 2));
      
      if (err.code) {
        console.error('- Error Code:', err.code);
      }

      // Try to log the full error in a safe way
      try {
        console.error('- Full Error:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      } catch (jsonError) {
        console.error('- Could not stringify full error object');
      }
      
      // Set a more descriptive error message based on the error type
      let errorMessage = 'Failed to upload submission. ';
      if (err.response?.status === 413) {
        errorMessage += 'File size too large.';
      } else if (err.response?.status === 415) {
        errorMessage += 'Invalid file type.';
      } else if (err.response?.status === 401) {
        errorMessage += 'Please log in again.';
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else if (err.response?.data?.detail) {
        errorMessage += err.response.data.detail;
      } else if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Assignment</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isUploading}
          >
            ✖
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{assignmentName}</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
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
                disabled={isUploading}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
              <label className={`bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
                Browse Files
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileSelect}
                  disabled={isUploading}
                />
              </label>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isUploading}
            className={`px-4 py-2 rounded-lg ${
              selectedFile && !isUploading 
                ? "bg-green-500 text-white hover:bg-green-600" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;