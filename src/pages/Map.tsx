
import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import useLocation from '@/hooks/useLocation';
import useStoriesManagement from '@/hooks/useStoriesManagement';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Story } from '@/types';
import { emotions } from '@/components/EmotionSelector';

const Map = () => {
  const { latitude, longitude, loading: locationLoading } = useLocation();
  const { nearbyStories, getNearbyStories } = useStoriesManagement();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (latitude && longitude) {
      getNearbyStories(latitude, longitude, 5);
    }
  }, [latitude, longitude, getNearbyStories]);

  // In a real app, this would be a proper map component
  // For now, we'll simulate it with a simple visualization
  return (
    <>
      <PageContainer>
        <Header title="Nearby Stories" />
        
        {locationLoading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p>Loading your location...</p>
          </div>
        ) : (
          <div className="relative bg-soulcast-lavender h-[60vh] rounded-xl overflow-hidden">
            {/* Simple map visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-soulcast-purple/30 to-soulcast-lavender/80" />
            
            {/* Current location marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-soulcast-purple rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="absolute top-0 left-0 w-6 h-6 bg-soulcast-purple rounded-full animate-ping opacity-75" />
            </div>
            
            {/* Story markers */}
            {nearbyStories.map((story, index) => {
              // Position markers in a circle around current location
              const angle = (index * (360 / nearbyStories.length)) * (Math.PI / 180);
              const distance = 80 + Math.random() * 60; // Random distance between 80-140px
              const left = `calc(50% + ${Math.cos(angle) * distance}px)`;
              const top = `calc(50% + ${Math.sin(angle) * distance}px)`;
              
              return (
                <div 
                  key={story.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left, top }}
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="flex flex-col items-center">
                    <MapPin className="h-9 w-9 text-soulcast-purple drop-shadow-md" />
                  </div>
                </div>
              );
            })}
            
            {/* Story overlay */}
            {selectedStory && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{selectedStory.anonymousName}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedStory(null)}
                  >
                    Close
                  </Button>
                </div>
                
                <audio 
                  src={selectedStory.audioUrl} 
                  controls 
                  className="w-full my-2" 
                />
                
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedStory.emotions.map(emotionId => {
                    const emotion = emotions.find(e => e.id === emotionId);
                    return emotion ? (
                      <span 
                        key={emotion.id} 
                        className={`px-2 py-0.5 text-xs rounded-full bg-${emotion.color}/10 text-${emotion.color}-700`}
                      >
                        {emotion.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Stories in this area</h3>
          <div className="space-y-2">
            {nearbyStories.length === 0 ? (
              <p className="text-muted-foreground text-sm">No stories found nearby.</p>
            ) : (
              nearbyStories.map(story => (
                <Button 
                  key={story.id}
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setSelectedStory(story)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {story.anonymousName}
                </Button>
              ))
            )}
          </div>
        </div>
      </PageContainer>
      <NavigationBar />
    </>
  );
};

export default Map;
