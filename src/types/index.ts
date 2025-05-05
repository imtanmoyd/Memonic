
export interface Story {
  id: string;
  audioUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
  emotions: string[];
  timestamp: number;
  duration: number;
  userId: string;
  anonymousName?: string;
  responses: StoryResponse[];
}

export interface StoryResponse {
  id: string;
  storyId: string;
  content: string;
  isAudio: boolean;
  timestamp: number;
  userId: string;
  anonymousName?: string;
}

export interface User {
  id: string;
  username: string;
  friendCode: string;
  friends: string[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'new-story' | 'new-response' | 'friend-request' | 'friend-accepted';
  message: string;
  timestamp: number;
  read: boolean;
  relatedId?: string;
}
