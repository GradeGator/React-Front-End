"use client"

import React from 'react';
import { Course } from '@/lib/api';
import Image from 'next/image';
import { useUser } from '@/app/contexts/UserContext';
import CourseInstructorView from '@/app/components/instructor/CourseInstructorView';
import CourseStudentView from '@/app/components/student/CourseStudentView';

interface Assignment {
  name: string;
  statuses: ('submitted' | 'late' | 'not_submitted' | 'graded')[];
  score?: string;
  timeCreated: string;
  deadline: string;
  hasRubric?: boolean;
}

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { role } = useUser();

  // Hard-coded course data for demonstration
  const course: Course = {
    id: 1,
    name: "CSC312 Software Design",
    number: "CSC 312",
    term: "Spring 2025",
    section: "A",
    department: "Computer Science",
    created_at: "2025-01-15",
    updated_at: "2025-01-15"
  };

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
