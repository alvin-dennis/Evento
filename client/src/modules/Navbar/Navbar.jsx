import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, User, LogOut, Plus, Home } from 'lucide-react';
import styles from './Navbar.module.css';
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/navbar";

function NavbarPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className={styles.navbar}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/" className={styles.logo}>
            <Calendar className={styles.logoIcon} />
            <span>EventHub</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavbarItem key={item.path} isActive={isActive(item.path)}>
              <Link 
                to={item.path}
                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <>
            <NavbarItem>
              <span className={styles.userName}>Welcome, {user.name}</span>
            </NavbarItem>
            <NavbarItem>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className={styles.logoutBtn}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavbarMenuItem key={item.path}>
              <Link
                to={item.path}
                className={`w-full ${isActive(item.path) ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {!user && (
          <>
            <NavbarMenuItem>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </NavbarMenuItem>
          </>
        )}
        {user && (
          <NavbarMenuItem>
            <Button 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              variant="outline"
              size="sm"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarPage;

