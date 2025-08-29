import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    if (isAuthenticated) {
      fetchEnrollments();
    }
  }, [isAuthenticated]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`/api/enrollments/user/${user.id}`);
      const data = await response.json();
      setEnrolledCourses(data.map(enrollment => enrollment.courseId));
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: courseId
        }),
      });

      if (response.ok) {
        setEnrolledCourses([...enrolledCourses, courseId]);
        alert('Enrolled successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Enrollment failed');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('Enrollment failed');
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  if (loading) {
    return <div className="courses-container">Loading courses...</div>;
  }

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-details">
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p className="course-price">${course.price}</p>
            </div>
            <button 
              className={`enroll-btn ${isEnrolled(course.id) ? 'enrolled' : ''}`}
              onClick={() => handleEnroll(course.id)}
              disabled={isEnrolled(course.id)}
            >
              {isEnrolled(course.id) ? 'Enrolled' : 'Enroll Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}