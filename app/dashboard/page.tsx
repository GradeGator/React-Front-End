"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import CourseBlock from '../components/CourseBlock';

const currentCourses = [
  { courseId: 'CSC312', courseName: 'Software Design', semester: 'Spring 2025' },
  { courseId: 'CSC221', courseName: 'Data Structure', semester: 'Spring 2025' },
  { courseId: 'CSC121 - AB', courseName: 'Introduction to Programming and Problem Solving', semester: 'Spring 2025' },
];

const pastCourses = [
  { courseId: 'CSC312', courseName: 'Software Design', semester: 'Fall 2024' },
  { courseId: 'CSC221', courseName: 'Data Structure', semester: 'Spring 2024' },
  { courseId: 'CSC121', courseName: 'Introduction to Programming and Problem Solving', semester: 'Fall 2024' },
  { courseId: 'CSC110', courseName: 'Foundations of Computing', semester: 'Fall 2022' },
];

function compareSemesters(a: string, b: string) {
  const [seasonA, yearA] = a.split(' ');
  const [seasonB, yearB] = b.split(' ');

  if (parseInt(yearA) !== parseInt(yearB)) {
    return parseInt(yearB) - parseInt(yearA); // Higher year first
  }

  return seasonA === 'Fall' ? -1 : 1; // Fall before Spring in the same year
}

export default function Dashboard() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name');

    const handleCourseClick = (courseId: string, semester: string) => {
        router.push(`/course/${courseId}-${semester.replace(' ', '-')}`);
    };

    const filteredPastCourses = pastCourses
        .filter((course) =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
        if (sortOption === 'name') {
            return a.courseName.localeCompare(b.courseName);
        } else if (sortOption === 'semester') {
            return compareSemesters(a.semester, b.semester);
        }
        return 0;
        });

    return (
        <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Dashboard - Instructor & Student</h1>

            <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Current</h2>
            <div className="grid grid-cols-3 gap-4">
                {currentCourses.map(course => (
                <div
                    key={course.courseId}
                    onClick={() => handleCourseClick(course.courseId, course.semester)}
                    className="cursor-pointer"
                >
                    <CourseBlock
                    courseId={course.courseId}
                    courseName={course.courseName}
                    semester={course.semester}
                    />
                </div>
                ))}
            </div>
            </section>

            <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-700">Past</h2>
                <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Search past courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="name">Sort by Name</option>
                    <option value="semester">Sort by Semester</option>
                </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {filteredPastCourses.map(course => (
                <CourseBlock
                    key={course.courseId}
                    courseId={course.courseId}
                    courseName={course.courseName}
                    semester={course.semester}
                />
                ))}
            </div>
            </section>

            <div className="fixed bottom-4 right-4">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md">
                Create New Course
            </button>
            </div>
        </div>
        </div>
    );
}
