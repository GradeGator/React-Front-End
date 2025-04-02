import React from 'react';
import { Course } from '@/lib/api';
import CourseDetailClient from './CourseDetailClient';

export const dynamic = 'force-dynamic';

export default async function CourseDetailPage(
  props: Promise<{
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }>
) {
  const { params } = await props;
  const courseId = Number(params.id);

  if (isNaN(courseId)) {
    throw new Error(`Invalid course ID: ${params.id}`);
  }

  const course: Course = {
    id: courseId,
    name: "CSC312 Software Design",
    number: "CSC 312",
    term: "Spring 2025",
    section: "A",
    department: "Computer Science",
    created_at: "2025-01-15",
    updated_at: "2025-01-15"
  };

  return <CourseDetailClient course={course} />;
}
