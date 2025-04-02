"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGraduationCap } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logged in with:", { email, password });
    router.push("/dashboard"); // Navigate to dashboard after login
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-bl from-purple-500 to-blue-500">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <div className="flex justify-between border-b pb-2 mb-4">
          <button className="text-gray-400"
          onClick={() => router.push("/signup")}>Sign Up</button>
          <button className="font-semibold border-b-2 border-black">Log In</button>
        </div>
        <div className="flex flex-col items-center">
          <img src="/logo.svg" alt="Logo" className="h-10 mb-4" />
          <h2 className="text-lg font-semibold mb-4">Log In</h2>
          <button className="flex items-center justify-center gap-2 w-full border px-4 py-2 rounded-md shadow-sm hover:bg-gray-100">
            <FaGraduationCap className="text-lg" /> Continue with School Account
          </button>
          <p className="text-gray-400 my-3">OR</p>
          <form onSubmit={handleSubmit} className="w-full">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block text-sm mt-3">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white mt-4 py-2 rounded hover:bg-gray-800"
            >
              Log In
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">
            By logging in, you agree to the <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
