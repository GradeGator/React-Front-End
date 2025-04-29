'use client'

import { FaBook, FaCog, FaInfoCircle } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';
import Image from 'next/image';
import { apiFunctions } from '../../lib/api';
import { useEffect, useState } from 'react';
import type { User } from '../../lib/api';

export default function Sidebar() {
  const { role, setRole } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const userData = await apiFunctions.getCurrentUser();
      setUser(userData);
      
      // Update role based on user type
      if (userData.is_instructor) {
        setRole('instructor');
      } else if (userData.is_student) {
        setRole('student');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
              <p className="font-medium text-gray-700">{user?.username || 'Loading...'}</p>
              <p className="text-sm text-gray-500">
                {role === 'instructor' ? 'Instructor' : 'Student'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
