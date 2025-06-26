import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Calendar, MapPin, Clock, Tag, Save, ArrowLeft } from 'lucide-react';
import styles from '../EventForm.module.css';

const EditEventPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getEventById, updateEvent } = useEvents();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [eventNotFound, setEventNotFound] = useState(false);

  const categories = [
    'Technology', 'Design', 'Business', 'Marketing', 'Photography', 
    'Education', 'Health', 'Sports', 'Music', 'Art', 'Other'
  ];

  useEffect(() => {
    const event = getEventById(id);
    if (!event) {
      setEventNotFound(true);
      return;
    }
    
    if (event.createdBy !== user.id) {
      navigate('/dashboard');
      return;
    }

    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category
    });
  }, [id, getEventById, user.id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.title.trim()) {
      setError('Event title is required');
      setLoading(false);
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Event description is required');
      setLoading(false);
      return;
    }
    
    if (!formData.date) {
      setError('Event date is required');
      setLoading(false);
      return;
    }
    
    if (!formData.time) {
      setError('Event time is required');
      setLoading(false);
      return;
    }
    
    if (!formData.location.trim()) {
      setError('Event location is required');
      setLoading(false);
      return;
    }
    
    if (!formData.category) {
      setError('Event category is required');
      setLoading(false);
      return;
    }

    try {
      updateEvent(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (eventNotFound) {
    return (
      <div className={styles.eventFormPage}>
        <div className={styles.container}>
          <Card className={styles.errorCard}>
            <CardContent className={styles.errorContent}>
              <h2>Event Not Found</h2>
              <p>The event you're looking for doesn't exist or has been deleted.</p>
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.eventFormPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className={styles.backButton}
          >
            <ArrowLeft size={18} />
            Back
          </Button>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Edit Event</h1>
            <p className={styles.pageSubtitle}>
              Update your event details and save changes
            </p>
          </div>
        </div>

        <Card className={styles.formCard}>
          <CardHeader className={styles.formHeader}>
            <div className={styles.formIcon}>
              <Save size={32} />
            </div>
            <CardTitle className={styles.formTitle}>Event Details</CardTitle>
          </CardHeader>
          
          <CardContent className={styles.formContent}>
            {error && (
              <Alert variant="destructive" className={styles.errorAlert}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className={styles.eventForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <Label htmlFor="title" className={styles.formLabel}>
                    <Calendar size={16} />
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="category" className={styles.formLabel}>
                    <Tag size={16} />
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className={styles.formInput}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="date" className={styles.formLabel}>
                    <Calendar size={16} />
                    Event Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="time" className={styles.formLabel}>
                    <Clock size={16} />
                    Event Time *
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="location" className={styles.formLabel}>
                  <MapPin size={16} />
                  Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="description" className={styles.formLabel}>
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event in detail..."
                  rows={4}
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.formActions}>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  size="lg"
                  className={styles.submitButton}
                >
                  {loading ? 'Updating Event...' : 'Update Event'}
                  <Save size={18} />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditEventPage;