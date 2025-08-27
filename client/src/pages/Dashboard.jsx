import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

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
    </div>
  );
}