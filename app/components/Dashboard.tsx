import CourseBlock from './CourseBlock';
import { FaPlus } from 'react-icons/fa';

const currentCourses = [
  { id: 'CSC312', name: 'Software Design', semester: 'Spring 2025' },
  { id: 'CSC221', name: 'Data Structure', semester: 'Spring 2025' },
  { id: 'CSC121 - AB', name: 'Intro to Programming', semester: 'Spring 2025' },
];

const pastCourses = [
  { id: 'CSC312', name: 'Software Design', semester: 'Fall 2024' },
  { id: 'CSC221', name: 'Data Structure', semester: 'Fall 2024' },
  { id: 'CSC121', name: 'Intro to Programming', semester: 'Fall 2024' },
];

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      {/* Current Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Current</h2>
        <div className="grid grid-cols-3 gap-4">
          {currentCourses.map(course => (
            <CourseBlock
              key={course.id}
              courseId={course.id}
              courseName={course.name}
              semester={course.semester}
            />
          ))}
        </div>
      </section>

      {/* Past Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Past</h2>
        <div className="grid grid-cols-3 gap-4">
          {pastCourses.map(course => (
            <CourseBlock
              key={course.id}
              courseId={course.id}
              courseName={course.name}
              semester={course.semester}
            />
          ))}
        </div>
      </section>

      {/* Create New Course Button */}
      <div className="fixed bottom-4 left-4">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md">
          <FaPlus />
          Create New Course
        </button>
      </div>
    </div>
  );
}
