import React, { useState, useMemo } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import EventCard from '../Common/EventCard';
import { Search, Filter, Calendar, SortAsc, SortDesc, X } from 'lucide-react';
import styles from './Events.module.css';

const EventsPage = () => {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(events.map(event => event.category))].sort();

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }, [events, searchTerm, selectedCategory, sortOrder]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOrder('asc');
  };

  const hasActiveFilters = searchTerm || selectedCategory || sortOrder !== 'asc';

  return (
    <div className={styles.eventsPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Discover Events</h1>
            <p className={styles.pageSubtitle}>
              Find amazing events happening around you. From conferences to workshops, there's something for everyone.
            </p>
          </div>
          <div className={styles.headerStats}>
            <Badge variant="secondary" className={styles.statBadge}>
              {filteredAndSortedEvents.length} Events Found
            </Badge>
          </div>
        </div>

        <Card className={styles.filtersCard}>
          <CardContent className={styles.filtersContent}>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <Search size={20} className={styles.searchIcon} />
                <Input
                  placeholder="Search events by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm('')}
                    className={styles.clearSearchButton}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={styles.filterToggle}
              >
                <Filter size={18} />
                Filters
                {hasActiveFilters && <Badge variant="destructive" className={styles.filterCount}>!</Badge>}
              </Button>
            </div>

            {showFilters && (
              <div className={styles.filterOptions}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className={styles.filterSelect}>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Sort by Date</label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className={styles.filterSelect}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">
                        <div className={styles.sortOption}>
                          <SortAsc size={16} />
                          Earliest First
                        </div>
                      </SelectItem>
                      <SelectItem value="desc">
                        <div className={styles.sortOption}>
                          <SortDesc size={16} />
                          Latest First
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className={styles.clearFiltersButton}
                  >
                    <X size={16} />
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {filteredAndSortedEvents.length === 0 ? (
          <Card className={styles.emptyStateCard}>
            <CardContent className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Calendar size={64} />
              </div>
              <h3 className={styles.emptyTitle}>
                {searchTerm || selectedCategory ? 'No Events Found' : 'No Events Available'}
              </h3>
              <p className={styles.emptyDescription}>
                {searchTerm || selectedCategory 
                  ? 'Try adjusting your search criteria or filters to find more events.' 
                  : 'Check back later for upcoming events or create your own!'}
              </p>
              {(searchTerm || selectedCategory) && (
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={styles.eventsGrid}>
            {filteredAndSortedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {!searchTerm && !selectedCategory && (
          <section className={styles.categoriesSection}>
            <h2 className={styles.categoriesTitle}>Browse by Category</h2>
            <div className={styles.categoriesGrid}>
              {categories.map(category => {
                const categoryCount = events.filter(event => event.category === category).length;
                return (
                  <Card 
                    key={category} 
                    className={styles.categoryCard}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className={styles.categoryContent}>
                      <h3 className={styles.categoryName}>{category}</h3>
                      <p className={styles.categoryCount}>{categoryCount} events</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EventsPage;