import Sidebar from '../components/Sidebar';
import CourseBlock from '../components/CourseBlock';

const currentCourses = [
  { courseId: 'CSC312', courseName: 'Software Design', semester: 'Spring 2025' },
  { courseId: 'CSC221', courseName: 'Data Structure', semester: 'Spring 2025' },
  { courseId: 'CSC121 - AB', courseName: 'Introduction to Programming and Problem Solving', semester: 'Spring 2025' },
];

const pastCourses = [
  { courseId: 'CSC312', courseName: 'Software Design', semester: 'Fall 2024' },
  { courseId: 'CSC221', courseName: 'Data Structure', semester: 'Fall 2024' },
  { courseId: 'CSC121', courseName: 'Introduction to Programming and Problem Solving', semester: 'Fall 2024' },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Dashboard - Instructor & Student</h1>

        {/* Current Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Current</h2>
          <div className="grid grid-cols-3 gap-4">
            {currentCourses.map(course => (
              <CourseBlock
                key={course.courseId}
                courseId={course.courseId}
                courseName={course.courseName}
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
                key={course.courseId}
                courseId={course.courseId}
                courseName={course.courseName}
                semester={course.semester}
              />
            ))}
          </div>
        </section>

        {/* Create New Course Button */}
        <div className="fixed bottom-4 right-4">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md">
            Create New Course
          </button>
        </div>
      </div>
    </div>
  );
}
