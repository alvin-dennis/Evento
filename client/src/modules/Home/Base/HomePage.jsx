import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Sparkles, Zap, Globe2, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className={styles.homePage}>
      <div className={styles.backgroundAnimation}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.floatingParticles}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle} style={{
              '--delay': `${i * 0.2}s`,
              '--duration': `${3 + (i % 3)}s`,
              '--size': `${2 + (i % 3)}px`
            }}></div>
          ))}
        </div>
      </div>

      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Sparkles size={16} />
              <span>The Future of Event Discovery</span>
              <div className={styles.badgeGlow}></div>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine1}>Discover</span>
              <span className={styles.titleLine2}>
                <span className={styles.gradientText}>Amazing Events</span>
              </span>
              <span className={styles.titleLine3}>Near You</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Join the next generation of event discovery. Connect with like-minded people, 
              explore incredible experiences, and create unforgettable memories with our 
              AI-powered event platform.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10K+</div>
                <div className={styles.statLabel}>Events</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50K+</div>
                <div className={styles.statLabel}>Users</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100+</div>
                <div className={styles.statLabel}>Cities</div>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <Link to="/events">
                <Button size="lg" className={styles.primaryButton}>
                  <Calendar size={20} />
                  Explore Events
                  <ArrowRight size={20} />
                  <div className={styles.buttonGlow}></div>
                </Button>
              </Link>
              {!user && (
                <Link to="/signup">
                  <Button variant="outline" size="lg" className={styles.secondaryButton}>
                    <Zap size={20} />
                    Get Started Free
                    <div className={styles.buttonShimmer}></div>
                  </Button>
                </Link>
              )}
            </div>

            <div className={styles.featureIcons}>
              <div className={styles.featureIcon}>
                <Globe2 size={24} />
                <span>Global Reach</span>
              </div>
              <div className={styles.featureIcon}>
                <Users size={24} />
                <span>Community Driven</span>
              </div>
              <div className={styles.featureIcon}>
                <Sparkles size={24} />
                <span>AI Powered</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.visualContainer}>
              <div className={styles.mainCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.cardTitle}>Tech Conference 2025</div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardImage}></div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardDate}>Mar 15, 2025</div>
                    <div className={styles.cardLocation}>San Francisco</div>
                    <div className={styles.cardAttendees}>245 attending</div>
                  </div>
                </div>
                <div className={styles.cardGlow}></div>
              </div>
              
              <div className={styles.floatingCard1}>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardIcon}>🎨</div>
                  <div className={styles.miniCardText}>Design Workshop</div>
                </div>
              </div>
              
              <div className={styles.floatingCard2}>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardIcon}>🚀</div>
                  <div className={styles.miniCardText}>Startup Pitch</div>
                </div>
              </div>
              
              <div className={styles.floatingCard3}>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardIcon}>📸</div>
                  <div className={styles.miniCardText}>Photo Class</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Calendar size={20} />
            <span>EventHub</span>
          </div>
          <div className={styles.footerText}>
            © 2025 EventHub. Crafted with passion for amazing experiences.
          </div>
          <div className={styles.footerGlow}></div>
        </div>
      </footer>
    </div>
  );
};
