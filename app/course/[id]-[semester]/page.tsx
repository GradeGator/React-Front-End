import { notFound } from 'next/navigation';
import { apiFunctions, Course } from '@/lib/api';

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string; semester: string };
}) {
  try {
    const course = await apiFunctions.getCourse(Number(params.id));
    
    if (!course) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {course.term}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{course.number}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">Section {course.section}</span>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700">Department</h2>
              <p className="mt-2 text-gray-600">{course.department}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700">Created</h2>
              <p className="mt-2 text-gray-600">{new Date(course.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching course:', error);
    return notFound();
  }
}
