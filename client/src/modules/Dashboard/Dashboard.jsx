import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EventCard from '../Events/Common/EventCard';
import { Plus, Calendar, Users, BarChart3, TrendingUp } from 'lucide-react';
import styles from './Dashboard.module.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const { getUserEvents } = useEvents();
  
  const userEvents = getUserEvents(user.id);
  const totalAttendees = userEvents.reduce((sum, event) => sum + event.attendees, 0);
  const upcomingEvents = userEvents.filter(event => new Date(event.date) > new Date());
  const pastEvents = userEvents.filter(event => new Date(event.date) <= new Date());

  const stats = [
    {
      title: "Total Events",
      value: userEvents.length,
      icon: <Calendar size={24} />,
      color: "blue"
    },
    {
      title: "Total Attendees",
      value: totalAttendees,
      icon: <Users size={24} />,
      color: "green"
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: <TrendingUp size={24} />,
      color: "orange"
    },
    {
      title: "Past Events",
      value: pastEvents.length,
      icon: <BarChart3 size={24} />,
      color: "purple"
    }
  ];

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        <div className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.dashboardTitle}>Welcome back, {user.name}!</h1>
            <p className={styles.dashboardSubtitle}>
              Manage your events and track their performance from your dashboard
            </p>
          </div>
          <Link to="/create-event">
            <Button size="lg" className={styles.createButton}>
              <Plus size={20} />
              Create New Event
            </Button>
          </Link>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
              <CardContent className={styles.statContent}>
                <div className={styles.statIcon}>
                  {stat.icon}
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <p className={styles.statTitle}>{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {userEvents.length === 0 ? (
          <Card className={styles.emptyStateCard}>
            <CardContent className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Calendar size={64} />
              </div>
              <h3 className={styles.emptyTitle}>No Events Yet</h3>
              <p className={styles.emptyDescription}>
                Get started by creating your first event. It's easy and takes just a few minutes!
              </p>
              <Link to="/create-event">
                <Button size="lg" className={styles.emptyButton}>
                  <Plus size={20} />
                  Create Your First Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {upcomingEvents.length > 0 && (
              <section className={styles.eventsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    Upcoming Events
                    <Badge variant="secondary" className={styles.countBadge}>
                      {upcomingEvents.length}
                    </Badge>
                  </h2>
                </div>
                <div className={styles.eventsGrid}>
                  {upcomingEvents.map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      showActions={true}
                    />
                  ))}
                </div>
              </section>
            )}

            {pastEvents.length > 0 && (
              <section className={styles.eventsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    Past Events
                    <Badge variant="outline" className={styles.countBadge}>
                      {pastEvents.length}
                    </Badge>
                  </h2>
                </div>
                <div className={styles.eventsGrid}>
                  {pastEvents.map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      showActions={true}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;