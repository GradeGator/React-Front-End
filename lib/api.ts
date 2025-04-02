import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base URL for all API requests
const API_URL = 'http://localhost:8000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get CSRF token from cookie
function getCsrfToken(): string | null {
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

// Add request interceptor to include CSRF token in headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

// API functions
export const apiFunctions = {
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
  }
};

// Error handling middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error - no response received');
    } else {
      console.error('Request Error:', error.message);
      throw new Error('Error setting up the request');
    }
  }
);

export default api; 