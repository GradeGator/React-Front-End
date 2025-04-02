"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupModal = () => {
  const router = useRouter();
  const [role, setRole] = useState<"Instructor" | "Student" | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button className="absolute top-4 right-4 text-gray-500">✖</button>

        <div className="flex justify-center mb-4">
          <div className="flex w-full">
            <button className="flex-1 py-2 bg-gray-700 text-white rounded-l-md">
              Sign up
            </button>
            <button className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-r-md" 
                onClick={() => router.push("/login")}>Log In
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="Gator Logo" className="w-10" />
        </div>

        <h2 className="text-center font-semibold">Grade Gator</h2>
        <p className="text-center text-gray-600 mb-4">
          Are you signing up as a student or professor?
        </p>

        <div className="space-y-2">
          <button
            className={`w-full py-2 border rounded-md ${
              role === "Instructor" ? "bg-green-500 text-white" : "bg-green-200"
            }`}
            onClick={() => setRole("Instructor")}
          >
            Instructor
          </button>
          <button
            className={`w-full py-2 border rounded-md ${
              role === "Student" ? "bg-green-500 text-white" : "bg-green-200"
            }`}
            onClick={() => setRole("Student")}
          >
            Student
          </button>
        </div>

        <button className="w-full mt-4 py-2 bg-black text-white rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
