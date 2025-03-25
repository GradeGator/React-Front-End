import { notFound } from 'next/navigation';

interface CourseInfo {
    courseName: string;
    semester: string;
    instructor: string;
    description: string;
}

interface CourseDetailPageProps {
    params: { courseId: string; semester: string };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
    const { courseId, semester } = params;

    // Add index signature here to allow dynamic access
    const courseData: Record<string, CourseInfo> = {
        'CSC312-Spring-2025': {
        courseName: 'Software Design',
        semester: 'Spring 2025',
        instructor: 'Dr. Jane Doe',
        description: 'An advanced course on software architecture and design patterns.'
        }
    };

    const courseKey = `${courseId}-${semester}`;
    const courseInfo = courseData[courseKey];

    if (!courseInfo) {
        return notFound(); // Handle 404 if course data is not found
    }

    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold">{courseInfo.courseName}</h1>
        <p className="text-gray-600">{courseInfo.semester}</p>
        <p className="mt-4">{courseInfo.description}</p>
        <p className="mt-2">Instructor: {courseInfo.instructor}</p>
        </div>
    );
}
