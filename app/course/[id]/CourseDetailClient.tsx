"use client"

import React from 'react';
import { Course } from '@/lib/api';
import { useUser } from '@/app/contexts/UserContext';
import CourseInstructorView from '@/app/components/instructor/CourseInstructorView';
import CourseStudentView from '@/app/components/student/CourseStudentView';

interface CourseDetailClientProps {
  course: Course;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const { role } = useUser();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {role === 'instructor' ? (
        <CourseInstructorView course={course} />
      ) : (
        <CourseStudentView course={course} />
      )}
    </div>
  );
} 