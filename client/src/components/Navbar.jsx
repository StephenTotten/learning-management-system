import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen(prev => !prev);
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
        <li><Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link></li>
      </ul>
    </nav>
  );
}
