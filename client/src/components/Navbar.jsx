import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Calendar, User, LogOut, Plus, Home } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Calendar className={styles.logoIcon} />
          <span>EventHub</span>
        </Link>

        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            <Home size={18} />
            Home
          </Link>
          <Link 
            to="/events" 
            className={`${styles.navLink} ${isActive('/events') ? styles.active : ''}`}
          >
            <Calendar size={18} />
            Events
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
              >
                <User size={18} />
                Dashboard
              </Link>
              <Link 
                to="/create-event" 
                className={`${styles.navLink} ${isActive('/create-event') ? styles.active : ''}`}
              >
                <Plus size={18} />
                Create Event
              </Link>
              <div className={styles.userSection}>
                <span className={styles.userName}>Welcome, {user.name}</span>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  size="sm"
                  className={styles.logoutBtn}
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;