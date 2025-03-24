interface CourseBlockProps {
    courseId: string;
    courseName: string;
    semester: string;
  }
  
export default function CourseBlock({ courseId, courseName, semester }: CourseBlockProps) {
    return (
        <div className="p-4 bg-blue-100 rounded-xl shadow-md">
        <h3 className="font-bold text-lg">{courseId}</h3>
        <p className="text-gray-600">{courseName}</p>
        <p className="text-sm text-gray-400">{semester}</p>
        </div>
    );
}
  