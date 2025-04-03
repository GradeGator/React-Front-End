import React from 'react';
import { Course, apiFunctions } from '@/lib/api';
import CourseDetailClient from './CourseDetailClient';

interface PageProps {
  params: { id: string };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params);
  const courseId = Number(id);

  if (isNaN(courseId)) {
    throw new Error(`Invalid course ID: ${id}`);
  }

  try {
    const course = await apiFunctions.getCourse(courseId);
    return <CourseDetailClient course={course} />;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw new Error('Failed to fetch course data');
  }
}
