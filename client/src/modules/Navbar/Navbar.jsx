import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, User, LogOut, Plus, Home, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Events", path: "/events", icon: Calendar },
    ...(user ? [
      { name: "Dashboard", path: "/dashboard", icon: User },
      { name: "Create Event", path: "/create-event", icon: Plus }
    ] : [])
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={handleLinkClick}>
            <div className={styles.logoIcon}>
              <Calendar size={24} />
            </div>
            <span className={styles.logoText}>Evento</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                  onClick={handleLinkClick}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className={styles.authSection}>
            {user ? (
              <div className={styles.userSection}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className={styles.userName}>{user.name}</span>
                </div>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  size="sm"
                  className={styles.logoutBtn}
                >
                  <LogOut size={16} />
                  <span className={styles.btnText}>Logout</span>
                </Button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login">
                  <Button variant="outline" size="sm" className={styles.loginBtn}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className={styles.signupBtn}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.active : ''}`}
                    onClick={handleLinkClick}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className={styles.mobileDivider} />
              
              {user ? (
                <div className={styles.mobileUserSection}>
                  <div className={styles.mobileUserInfo}>
                    <div className={styles.avatar}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span>Welcome, {user.name}</span>
                  </div>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    className={styles.mobileLogoutBtn}
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className={styles.mobileAuthButtons}>
                  <Link to="/login" onClick={handleLinkClick}>
                    <Button variant="outline" className={styles.mobileLoginBtn}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={handleLinkClick}>
                    <Button className={styles.mobileSignupBtn}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

