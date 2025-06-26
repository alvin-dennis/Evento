import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents } from '@/contexts/EventContext';
import styles from './EventCard.module.css';

const EventCard = ({ event, showActions = false, onEdit, onDelete }) => {
  const { user } = useAuth();
  const { deleteEvent } = useEvents();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      if (onDelete) onDelete();
    }
  };

  return (
    <Card className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <img 
          src={event.image} 
          alt={event.title}
          className={styles.eventImage}
        />
        <Badge className={styles.categoryBadge}>
          {event.category}
        </Badge>
      </div>
      
      <CardHeader className={styles.cardHeader}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDescription}>{event.description}</p>
      </CardHeader>

      <CardContent className={styles.cardContent}>
        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <Calendar size={16} />
            <span>{formatDate(event.date)} at {event.time}</span>
          </div>
          <div className={styles.detailItem}>
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className={styles.detailItem}>
            <Users size={16} />
            <span>{event.attendees} attendees</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className={styles.cardFooter}>
        {showActions && user && user.id === event.createdBy ? (
          <div className={styles.actionButtons}>
            <Link to={`/edit-event/${event.id}`}>
              <Button variant="outline" size="sm">
                <Edit size={16} />
                Edit
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </div>
        ) : (
          <Button className={styles.joinButton}>
            Join Event
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;