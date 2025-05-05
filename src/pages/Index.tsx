
import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import StoryItem from '@/components/story/StoryItem';
import useLocation from '@/hooks/useLocation';
import useStoriesManagement from '@/hooks/useStoriesManagement';
import useUserManagement from '@/hooks/useUserManagement';
import { Story } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateDistance } from '@/lib/locationUtils';

const Index = () => {
  const [storyDistances, setStoryDistances] = useState<Record<string, number>>({});
  const { latitude, longitude, loading: locationLoading } = useLocation();
  const { nearbyStories, getNearbyStories, isLoading: storiesLoading } = useStoriesManagement();
  const { user } = useUserManagement();

  useEffect(() => {
    if (latitude && longitude) {
      getNearbyStories(latitude, longitude, 5);
    }
  }, [latitude, longitude, getNearbyStories]);

  useEffect(() => {
    if (latitude && longitude && nearbyStories.length > 0) {
      const distances: Record<string, number> = {};
      
      nearbyStories.forEach(story => {
        distances[story.id] = calculateDistance(
          latitude,
          longitude,
          story.location.latitude,
          story.location.longitude
        );
      });
      
      setStoryDistances(distances);
    }
  }, [latitude, longitude, nearbyStories]);

  const isLoading = locationLoading || storiesLoading;

  return (
    <>
      <PageContainer>
        <Header title="SoulCast" />
        
        <h2 className="text-lg font-medium mb-4">
          {isLoading ? 'Finding stories near you...' : 
            nearbyStories.length > 0 ? 'Stories Near You' : 'No stories nearby'}
        </h2>
        
        {isLoading ? (
          // Loading state
          Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 mb-4 rounded-2xl" />
          ))
        ) : nearbyStories.length > 0 ? (
          // Stories list
          nearbyStories.map(story => (
            <StoryItem 
              key={story.id} 
              story={story} 
              distance={storyDistances[story.id]} 
            />
          ))
        ) : (
          // Empty state
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-2">No stories found nearby.</p>
            <p className="text-sm">Be the first to share a story in this area!</p>
          </div>
        )}
      </PageContainer>
      <NavigationBar />
    </>
  );
};

export default Index;
