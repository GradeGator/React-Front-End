'use client'

import { FaBook, FaCog, FaInfoCircle } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import Image from 'next/image';
import { apiFunctions } from '../../lib/api';

export default function Sidebar() {
  const { role, setRole } = useUser();

  const checkAuthStatus = async () => {
    try {
      const response = await apiFunctions.checkAuthStatus();
      console.log('Auth Status:', response);
      if (!response.is_authenticated) {
        // If not authenticated, redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // On error, redirect to login
      window.location.href = '/login';
    }
  };

  return (
    <div className="h-screen w-64 bg-white shadow-md flex flex-col justify-between">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <Image src="/logo.svg" alt="Grade Gator" width={32} height={32} className="h-8 w-8" />
        <h1 className="text-xl font-bold text-green-600">Grade Gator</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="flex items-center p-4 bg-green-100 border-l-4 border-green-600">
            <FaBook className="text-green-600 mr-3" />
            <span className="text-green-600 font-medium">Courses</span>
          </li>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="p-4 border-t">
        <ul className="space-y-2">
          <li className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-green-600">
            <FaCog />
            <span>Settings</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-green-600">
            <FaInfoCircle />
            <span>Help center</span>
          </li>
          <li>
            <button
              onClick={checkAuthStatus}
              className="w-full mt-2 p-2 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
            >
              Test Auth Status
            </button>
          </li>
        </ul>

        {/* Profile */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <Image
              src="/user-avatar.svg"
              alt="Profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-700">Louise Thompson</p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'student' | 'instructor')}
                className="text-sm text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-green-600 p-0"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
