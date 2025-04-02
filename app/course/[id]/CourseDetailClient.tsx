"use client"

import React from 'react';
import { Course } from '@/lib/api';
import Image from 'next/image';
import { useUser } from '@/app/contexts/UserContext';
import CourseInstructorView from '@/app/components/instructor/CourseInstructorView';
import CourseStudentView from '@/app/components/student/CourseStudentView';

interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const { role } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Grade Gator" width={32} height={32} />
          <span className="text-xl font-semibold text-gray-800">Grade Gator</span>
        </div>
      </div>

      <div className="flex">
        {role === 'instructor' ? (
          <CourseInstructorView course={course} />
        ) : (
          <CourseStudentView course={course} />
        )}
      </div>
    </div>
  );
} 