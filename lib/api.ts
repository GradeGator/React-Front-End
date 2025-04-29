import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base URL for all API requests
const API_URL = 'http://localhost:8000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get access token safely
// const getAccessToken = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('access_token');
//   }
//   return null;
// };

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   // Clear token and redirect to login on 401
    //   if (typeof window !== 'undefined') {
    //     localStorage.removeItem('access_token');
    //     window.location.href = '/login';
    //   }
    // }
    return Promise.reject(error);
  }
);

// Function to get CSRF token from cookie
function getCsrfToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const tokenCookieName = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === tokenCookieName) {
      return value;
    }
  }
  return null;
}

// Add request interceptor to include CSRF token and access token in headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add access token if available
    // const token = getAccessToken();
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }

    // Add CSRF token for mutations
    if (config.method && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Type definitions matching API schema
export interface Course {
  id: number;
  name: string;
  number: string;
  term: string;
  section: string;
  department: string;
  created_at: string;
  updated_at: string;
}

export interface CourseRequest {
  name: string;
  number: string;
  term: string;
  section: string;
  department: string;
}

export interface AuthStatus {
  is_authenticated: boolean;
  message?: string;
}

export interface Assignment {
  id: number;
  assignment_id: string;
  title: string;
  description: string;
  questions: string;
  grade_method: 'POINTS' | 'PERCENT' | 'LETTER' | 'STANDARDS';
  scoring_breakdown: string;
  timing: string;
  due_date: string;
  is_visible_to_students: boolean;
  created_at: string;
  updated_at: string;
  course: number;
}

export interface Submission {
  id: number;
  submission_file: string;
  student: number;
  assignment: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_student: boolean;
  is_instructor: boolean;
  student: {
    id: number;
  } | null;
  instructor: {
    id: number;
  } | null;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  first_name: string;
  last_name: string;
  preferred_name: string;
  is_student: boolean;
  is_instructor: boolean;
}

// API functions
export const apiFunctions = {
  // Check authentication status
  checkAuthStatus: async (): Promise<AuthStatus> => {
    const response = await api.get<AuthStatus>('/auth-status/');
    return response.data;
  },

  // Get all courses
  getCourses: async (): Promise<Course[]> => {
    const response = await api.get<Course[]>('/courses/');
    return response.data;
  },

  // Get a specific course
  getCourse: async (id: number): Promise<Course> => {
    const response = await api.get<Course>(`/courses/${id}/`);
    return response.data;
  },

  // Create a new course
  createCourse: async (courseData: CourseRequest): Promise<Course> => {
    const response = await api.post<Course>('/courses/', courseData);
    return response.data;
  },

  // Update a course
  updateCourse: async (id: number, courseData: Partial<CourseRequest>): Promise<Course> => {
    const response = await api.patch<Course>(`/courses/${id}/`, courseData);
    return response.data;
  },

  // Delete a course
  deleteCourse: async (id: number): Promise<void> => {
    await api.delete(`/courses/${id}/`);
  },

  // Assignment functions
  getAssignments: async (): Promise<Assignment[]> => {
    const response = await api.get<Assignment[]>('/assignments/');
    return response.data;
  },

  getAssignment: async (id: number): Promise<Assignment> => {
    const response = await api.get<Assignment>(`/assignments/${id}/`);
    return response.data;
  },

  createAssignment: async (assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>): Promise<Assignment> => {
    const response = await api.post<Assignment>('/assignments/', assignment);
    return response.data;
  },

  updateAssignment: async (id: number, assignment: Partial<Assignment>): Promise<Assignment> => {
    const response = await api.patch<Assignment>(`/assignments/${id}/`, assignment);
    return response.data;
  },

  deleteAssignment: async (id: number): Promise<void> => {
    await api.delete(`/assignments/${id}/`);
  },

  // Get assignments for a specific course
  getCourseAssignments: async (courseId: number): Promise<Assignment[]> => {
    const response = await api.get<Assignment[]>('/assignments/', {
      params: {
        course: courseId
      }
    });
    return response.data.filter(assignment => assignment.course === courseId);
  },

  // Upload submission file
  uploadSubmission: async (submissionData: { 
    submission_file: File,
    student: number,
    assignment: number 
  }): Promise<Submission> => {
    const formData = new FormData();
    formData.append('submission_file', submissionData.submission_file);
    formData.append('student', submissionData.student.toString());
    formData.append('assignment', submissionData.assignment.toString());

    const response = await api.post<Submission>('/upload/submission/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/current-user/');
    return response.data;
  },

  // Register a new user
  register: async (userData: RegisterRequest): Promise<User> => {
    const response = await api.post<User>('/register/', userData);
    return response.data;
  },
};

export default api; 