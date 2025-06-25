import React, { createContext, useContext, useState } from 'react';
import { dummyEvents } from '../data/dummyEvents';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([...dummyEvents]);

  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      attendees: 0,
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800"
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (id, eventData) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === parseInt(id) ? { ...event, ...eventData } : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== parseInt(id)));
  };

  const getEventById = (id) => {
    return events.find(event => event.id === parseInt(id));
  };

  const getUserEvents = (userId) => {
    return events.filter(event => event.createdBy === userId);
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getUserEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};