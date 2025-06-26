import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import styles from '../Auth.module.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);

    const result = signup(name, email, password);
    
    if (result.success) {
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <Card className={styles.authCard}>
          <CardHeader className={styles.authHeader}>
            <div className={styles.authIcon}>
              <UserPlus size={32} />
            </div>
            <CardTitle className={styles.authTitle}>Create Account</CardTitle>
            <p className={styles.authSubtitle}>
              Join EventHub and start creating amazing events today
            </p>
          </CardHeader>
          
          <CardContent className={styles.authContent}>
            {error && (
              <Alert variant="destructive" className={styles.errorAlert}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.formGroup}>
                <Label htmlFor="name" className={styles.formLabel}>
                  <User size={16} />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="email" className={styles.formLabel}>
                  <Mail size={16} />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="password" className={styles.formLabel}>
                  <Lock size={16} />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="confirmPassword" className={styles.formLabel}>
                  <Lock size={16} />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className={styles.formInput}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={loading}
                className={styles.submitButton}
                size="lg"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight size={18} />
              </Button>
            </form>
            
            <div className={styles.authFooter}>
              <p className={styles.authFooterText}>
                Already have an account?{' '}
                <Link to="/login" className={styles.authLink}>
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
