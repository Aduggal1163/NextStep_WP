import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    const role = user.role;
    const links = {
      user: '/user',
      planner: '/planner',
      vendor: '/vendor',
      admin: '/admin',
    };
    return links[role];
  };

  return (
    <nav className="navbar" >
      <div className="navbar-container" >
        <Link to="/" className="navbar-logo">
          💍 Wedding Planner
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to={getDashboardLink()} className="navbar-link">
                Dashboard
              </Link>
              <span className="navbar-user">Welcome, {user.name || user.email}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary"style={{
    background: "linear-gradient(to right, #e11d48, #9333ea)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "999px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 8px 20px rgba(225, 29, 72, 0.35)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 12px 30px rgba(147, 51, 234, 0.4)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 8px 20px rgba(225, 29, 72, 0.35)";
  }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

