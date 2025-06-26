import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import styles from '../Auth.module.css';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    
    if (result.success) {
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
              <LogIn size={32} />
            </div>
            <CardTitle className={styles.authTitle}>Welcome Back</CardTitle>
            <p className={styles.authSubtitle}>
              Sign in to your account to continue managing your events
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
                  placeholder="Enter your password"
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
                {loading ? 'Signing In...' : 'Sign In'}
                <ArrowRight size={18} />
              </Button>
            </form>
            
            <div className={styles.authFooter}>
              <p className={styles.authFooterText}>
                Don't have an account?{' '}
                <Link to="/signup" className={styles.authLink}>
                  Create one here
                </Link>
              </p>
            </div>
            
            <div className={styles.demoCredentials}>
              <p className={styles.demoTitle}>Demo Credentials:</p>
              <p className={styles.demoInfo}>Email: john@example.com</p>
              <p className={styles.demoInfo}>Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
