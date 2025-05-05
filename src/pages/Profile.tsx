
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import useUserManagement from '@/hooks/useUserManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const Profile = () => {
  const { user, addFriend, markNotificationAsRead } = useUserManagement();
  const [friendCode, setFriendCode] = useState('');
  
  const handleAddFriend = async () => {
    if (!friendCode.trim()) {
      toast.error('Please enter a friend code');
      return;
    }
    
    const success = await addFriend(friendCode);
    if (success) {
      setFriendCode('');
    }
  };
  
  const copyFriendCode = () => {
    if (!user) return;
    
    navigator.clipboard.writeText(user.friendCode)
      .then(() => {
        toast.success('Friend code copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy friend code');
      });
  };
  
  if (!user) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-[80vh]">
          <p>Loading profile...</p>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <>
      <PageContainer>
        <Header title="Your Profile" />
        
        <div className="space-y-6">
          {/* Profile Info */}
          <Card className="p-4 bg-gradient-to-r from-soulcast-purple to-accent text-white">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-white/80 text-sm">Anonymous Soul</p>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Your Friend Code</span>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={copyFriendCode}
                >
                  Copy
                </Button>
              </div>
              <div className="mt-1 bg-white/20 rounded px-3 py-2 text-center">
                {user.friendCode}
              </div>
            </div>
          </Card>
          
          {/* Add Friend */}
          <div className="space-y-2">
            <h3 className="font-medium">Add Friend</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter friend code"
                value={friendCode}
                onChange={(e) => setFriendCode(e.target.value)}
              />
              <Button onClick={handleAddFriend}>Add</Button>
            </div>
          </div>
          
          {/* Friends List */}
          <div className="space-y-2">
            <h3 className="font-medium">Friends ({user.friends.length})</h3>
            {user.friends.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                You haven't added any friends yet. Share your friend code or add friends using their code.
              </p>
            ) : (
              <div className="space-y-2">
                {user.friends.map((friendCode, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Anonymous Friend</p>
                        <p className="text-xs text-muted-foreground">{friendCode}</p>
                      </div>
                      <Button variant="ghost" size="sm">Message</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Notifications */}
          <div className="space-y-2">
            <h3 className="font-medium">Notifications</h3>
            {user.notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No notifications</p>
            ) : (
              <div className="space-y-2">
                {user.notifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`p-3 ${!notification.read ? 'bg-secondary/50' : ''}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>
      <NavigationBar />
    </>
  );
};

export default Profile;
