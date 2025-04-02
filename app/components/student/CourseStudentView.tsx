'use client'

import React, { useState } from 'react';
import { Course } from '@/lib/api';
import { FaSearch } from 'react-icons/fa';
import UploadModal from '@/app/components/UploadModal';
import CourseSidebarStudent from '@/app/components/student/CourseSidebarStudent';

interface Assignment {
  name: string;
  statuses: ('submitted' | 'late' | 'not_submitted' | 'graded')[];
  score?: string;
  timeCreated: string;
  deadline: string;
  hasRubric?: boolean;
}

interface CourseStudentViewProps {
  course: Course;
}

export default function CourseStudentView({ course }: CourseStudentViewProps) {
  const [activeTab, setActiveTab] = useState<'assignments' | 'gradebook'>('assignments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  // Hard-coded assignments data for demonstration
  const assignments: Assignment[] = [
    {
      name: "Homework 1",
      statuses: ["graded"],
      score: "92 / 100",
      timeCreated: "March 15 2021, 12:47 PM",
      deadline: "March 31 2021, 11:59 PM"
    },
    {
      name: "Homework 2",
      statuses: ["submitted", "late"],
      timeCreated: "March 15 2021, 12:47 PM",
      deadline: "March 31 2021, 11:59 PM",
      hasRubric: true
    },
    {
      name: "Homework 3",
      statuses: ["late"],
      timeCreated: "March 15 2021, 12:47 PM",
      deadline: "March 31 2021, 11:59 PM"
    },
    {
      name: "Homework 4",
      statuses: ["submitted"],
      timeCreated: "March 15 2021, 12:47 PM",
      deadline: "March 31 2021, 11:59 PM"
    },
    {
      name: "Homework 5",
      statuses: ["not_submitted"],
      timeCreated: "March 15 2021, 12:47 PM",
      deadline: "March 31 2021, 11:59 PM"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Submitted</span>;
      case 'late':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">Late</span>;
      case 'not_submitted':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Not Submitted</span>;
      default:
        return null;
    }
  };

  const handleAssignmentClick = (assignment: Assignment) => {
    if (assignment.statuses.includes('not_submitted')) {
      setSelectedAssignment(assignment.name);
    }
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'assignments':
        return (
          <>
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
                <p className="text-gray-600 mt-2">{course.term}</p>
              </div>
              <div className="w-96 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50">
                <div className="font-semibold text-gray-600">ASSIGNMENT NAME</div>
                <div className="font-semibold text-gray-600">STATUS</div>
                <div className="font-semibold text-gray-600">TIME CREATED</div>
                <div className="font-semibold text-gray-600">RUBRIC</div>
                <div className="font-semibold text-gray-600">DEADLINE</div>
              </div>

              {filteredAssignments.map((assignment, index) => (
                <div
                  key={index}
                  onClick={() => handleAssignmentClick(assignment)}
                  className={`grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50 ${
                    assignment.statuses.includes('not_submitted') ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="text-gray-800">{assignment.name}</div>
                  <div className="flex items-center gap-2">
                    {assignment.score ? (
                      <span className="text-gray-800">{assignment.score}</span>
                    ) : (
                      assignment.statuses.map((status, statusIndex) => (
                        <React.Fragment key={statusIndex}>
                          {getStatusBadge(status)}
                        </React.Fragment>
                      ))
                    )}
                  </div>
                  <div className="text-gray-600">{assignment.timeCreated}</div>
                  <div>
                    {assignment.hasRubric && (
                      <button className="text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="text-gray-600">{assignment.deadline}</div>
                </div>
              ))}
            </div>
          </>
        );
      case 'gradebook':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800">Grade Book</h2>
            <p className="text-gray-600 mt-2">Grade book content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1">
      <CourseSidebarStudent 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>

      <UploadModal
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        assignmentName={selectedAssignment || ''}
      />
    </div>
  );
} 