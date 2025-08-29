import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">My Courses</h1>
      <div className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>
      <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
        <li><Link to="/courses" onClick={() => setMobileOpen(false)}>Courses</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}
