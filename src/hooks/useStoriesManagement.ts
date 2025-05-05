
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Story } from '@/types';
import { toast } from 'sonner';

// This will be replaced with actual API calls when backend is implemented
const MOCK_STORAGE_KEY = 'soulcast-stories';

interface UseStoriesManagementReturn {
  stories: Story[];
  nearbyStories: Story[];
  isLoading: boolean;
  error: string | null;
  addStory: (
    audioBlob: Blob,
    location: { latitude: number; longitude: number },
    emotions: string[],
    duration: number
  ) => Promise<Story>;
  getStoryById: (id: string) => Story | undefined;
  addResponse: (storyId: string, response: string, isAudio: boolean) => Promise<void>;
  getNearbyStories: (latitude: number, longitude: number, radiusKm: number) => Promise<Story[]>;
}

const useStoriesManagement = (): UseStoriesManagementReturn => {
  const [stories, setStories] = useState<Story[]>([]);
  const [nearbyStories, setNearbyStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load stories from localStorage on mount
  useEffect(() => {
    try {
      const savedStories = localStorage.getItem(MOCK_STORAGE_KEY);
      if (savedStories) {
        setStories(JSON.parse(savedStories));
      }
    } catch (err) {
      console.error('Failed to load stories:', err);
      setError('Failed to load stories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save stories to localStorage whenever they change
  useEffect(() => {
    if (stories.length > 0) {
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(stories));
    }
  }, [stories]);

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get stories near a specific location
  const getNearbyStories = useCallback(
    async (latitude: number, longitude: number, radiusKm: number = 2): Promise<Story[]> => {
      try {
        setIsLoading(true);
        
        // Filter stories based on distance
        const nearby = stories.filter(story => {
          const distance = calculateDistance(
            latitude,
            longitude,
            story.location.latitude,
            story.location.longitude
          );
          return distance <= radiusKm;
        });
        
        setNearbyStories(nearby);
        return nearby;
      } catch (err) {
        console.error('Failed to get nearby stories:', err);
        setError('Failed to get nearby stories');
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [stories]
  );

  // Add a new story
  const addStory = useCallback(
    async (
      audioBlob: Blob,
      location: { latitude: number; longitude: number },
      emotions: string[],
      duration: number
    ): Promise<Story> => {
      try {
        setIsLoading(true);
        
        // In a real app, we'd upload the audio to a storage service
        // For now, we'll create a temporary URL
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const newStory: Story = {
          id: uuidv4(),
          audioUrl,
          location,
          emotions,
          timestamp: Date.now(),
          duration,
          userId: 'anonymous', // Replace with actual user ID when auth is implemented
          anonymousName: 'Anonymous Soul',
          responses: [],
        };
        
        setStories(prev => [newStory, ...prev]);
        toast.success('Story shared successfully');
        return newStory;
      } catch (err) {
        console.error('Failed to add story:', err);
        setError('Failed to add story');
        toast.error('Failed to share story');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Get a story by ID
  const getStoryById = useCallback(
    (id: string): Story | undefined => {
      return stories.find(story => story.id === id);
    },
    [stories]
  );

  // Add a response to a story
  const addResponse = useCallback(
    async (storyId: string, response: string, isAudio: boolean): Promise<void> => {
      try {
        setIsLoading(true);
        
        const newResponse = {
          id: uuidv4(),
          storyId,
          content: response,
          isAudio,
          timestamp: Date.now(),
          userId: 'anonymous', // Replace with actual user ID when auth is implemented
          anonymousName: 'Anonymous Soul',
        };
        
        setStories(prev =>
          prev.map(story =>
            story.id === storyId
              ? { ...story, responses: [...story.responses, newResponse] }
              : story
          )
        );
        
        toast.success('Response added');
      } catch (err) {
        console.error('Failed to add response:', err);
        setError('Failed to add response');
        toast.error('Failed to add response');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    stories,
    nearbyStories,
    isLoading,
    error,
    addStory,
    getStoryById,
    addResponse,
    getNearbyStories,
  };
};

export default useStoriesManagement;
