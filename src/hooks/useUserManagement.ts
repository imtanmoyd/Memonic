
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User, Notification } from '@/types';
import { toast } from 'sonner';

// This will be replaced with actual API calls when backend is implemented
const MOCK_USER_KEY = 'soulcast-user';

interface UseUserManagementReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  createAnonymousUser: () => Promise<User>;
  addFriend: (friendCode: string) => Promise<boolean>;
  markNotificationAsRead: (notificationId: string) => void;
  getUnreadNotificationsCount: () => number;
}

const useUserManagement = (): UseUserManagementReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(MOCK_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Auto-create anonymous user if none exists
        createAnonymousUser();
      }
    } catch (err) {
      console.error('Failed to load user:', err);
      setError('Failed to load user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
    }
  }, [user]);

  // Create an anonymous user
  const createAnonymousUser = useCallback(async (): Promise<User> => {
    try {
      setIsLoading(true);
      
      const newUser: User = {
        id: uuidv4(),
        username: `Soul${Math.floor(Math.random() * 10000)}`,
        friendCode: `${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`,
        friends: [],
        notifications: [{
          id: uuidv4(),
          type: 'new-story',
          message: 'Welcome to SoulCast! Your anonymous stories await.',
          timestamp: Date.now(),
          read: false,
        }],
      };
      
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error('Failed to create anonymous user:', err);
      setError('Failed to create anonymous user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a friend using their friend code
  const addFriend = useCallback(
    async (friendCode: string): Promise<boolean> => {
      try {
        if (!user) throw new Error('No user found');
        
        // In a real app, we'd verify the friend code against a database
        // For now, we'll just simulate a successful addition
        
        // Check if already a friend
        if (user.friends.includes(friendCode)) {
          toast.error('Already friends with this user');
          return false;
        }
        
        // Create a properly typed notification
        const newNotification: Notification = {
          id: uuidv4(),
          type: 'friend-accepted', // Using one of the allowed literal types
          message: 'New friend added!',
          timestamp: Date.now(),
          read: false,
        };
        
        // Update user state with type-safe properties
        setUser({
          ...user,
          friends: [...user.friends, friendCode],
          notifications: [...user.notifications, newNotification],
        });
        
        toast.success('Friend added successfully');
        return true;
      } catch (err) {
        console.error('Failed to add friend:', err);
        setError('Failed to add friend');
        toast.error('Failed to add friend');
        return false;
      }
    },
    [user]
  );

  // Mark a notification as read
  const markNotificationAsRead = useCallback(
    (notificationId: string) => {
      if (!user) return;
      
      setUser({
        ...user,
        notifications: user.notifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        ),
      });
    },
    [user]
  );

  // Get count of unread notifications
  const getUnreadNotificationsCount = useCallback((): number => {
    if (!user) return 0;
    return user.notifications.filter(notification => !notification.read).length;
  }, [user]);

  return {
    user,
    isLoading,
    error,
    createAnonymousUser,
    addFriend,
    markNotificationAsRead,
    getUnreadNotificationsCount,
  };
};

export default useUserManagement;
