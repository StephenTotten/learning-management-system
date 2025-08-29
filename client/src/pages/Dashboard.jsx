import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrollments();
    }
  }, [isAuthenticated]);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`/api/enrollments/user/${user.id}`);
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="dashboard">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard">
      <div className="user-card">
        <h2>Welcome, {user.firstName}!</h2>
        <div className="user-details">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      <div className="enrolled-courses">
        <h3>My Courses</h3>
        {loading ? (
          <p>Loading courses...</p>
        ) : enrollments.length > 0 ? (
          <div className="course-list">
            {enrollments.map(enrollment => (
              <div key={enrollment.id} className="enrolled-course">
                <h4>{enrollment.Course.title}</h4>
                <p>{enrollment.Course.description}</p>
                <div className="progress-info">
                  <span>Progress: {enrollment.progress}%</span>
                  <span className={`status ${enrollment.completed ? 'completed' : 'in-progress'}`}>
                    {enrollment.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses enrolled yet. <a href="/courses">Browse courses</a> to get started!</p>
        )}
      </div>
    </div>
  );
}