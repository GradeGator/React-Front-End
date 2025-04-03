"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGraduationCap } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert("Login failed. Please check your credentials.");
        return;
      }
  
      const data = await response.json();
      const { access, refresh } = data;
  
      // Store tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
  
      // Optional: Set default header if using a shared axios instance
      // api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  
      console.log("Login successful:", data);
      router.push("/dashboard"); // Redirect on success
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong. Please try again.");
    }
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
            <label className="block text-sm">Username</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
