"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import CourseBlock from '../components/CourseBlock';
import CreateCourseModal from '../components/CreateCourseModal';
import { apiFunctions, Course } from '@/lib/api';

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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const fetchedCourses = await apiFunctions.getCourses();
                setCourses(fetchedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const currentCourses = courses.filter(course => 
        course.term === 'Spring' || course.term === 'Fall'
    );

    const pastCourses = courses.filter(course => 
        course.term !== 'Spring' && course.term !== 'Fall'
    );

    const handleCourseClick = (course: Course) => {
        router.push(`/course/${course.id}-${course.term}`);
    };

    const filteredPastCourses = pastCourses
        .filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortOption === 'semester') {
                return compareSemesters(a.term, b.term);
            }
            return 0;
        });

    if (isLoading) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 p-8 bg-gray-50">
                    <div>Loading courses...</div>
                </div>
            </div>
        );
    }

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
                                key={course.id}
                                onClick={() => handleCourseClick(course)}
                                className="cursor-pointer"
                            >
                                <CourseBlock
                                    courseId={course.number}
                                    courseName={course.name}
                                    semester={course.term}
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
                            <div
                                key={course.id}
                                onClick={() => handleCourseClick(course)}
                                className="cursor-pointer"
                            >
                                <CourseBlock
                                    courseId={course.number}
                                    courseName={course.name}
                                    semester={course.term}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="fixed bottom-4 right-4">
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md"
                    >
                        Create New Course
                    </button>
                </div>

                <CreateCourseModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            </div>
        </div>
    );
}
