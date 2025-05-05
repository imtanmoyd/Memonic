
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import useStoriesManagement from '@/hooks/useStoriesManagement';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { emotions } from '@/components/EmotionSelector';
import EmotionTag from '@/components/EmotionTag';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStoryById, addResponse } = useStoriesManagement();
  const [responseText, setResponseText] = useState('');
  
  const story = id ? getStoryById(id) : undefined;
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleSubmitResponse = async () => {
    if (!id || !responseText.trim()) {
      toast.error('Please enter a response');
      return;
    }
    
    try {
      await addResponse(id, responseText, false);
      setResponseText('');
    } catch (error) {
      console.error('Failed to add response:', error);
      toast.error('Failed to submit response. Please try again.');
    }
  };
  
  if (!story) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
          <p>Story not found</p>
          <Button variant="outline" onClick={handleBack}>Go Back</Button>
        </div>
      </PageContainer>
    );
  }
  
  const storyEmotions = emotions.filter(e => story.emotions.includes(e.id));
  
  return (
    <>
      <PageContainer>
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Story</h1>
        </div>
        
        <div className="space-y-6">
          {/* Story Card */}
          <div className="story-bubble">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white">
                  {story.anonymousName || 'Anonymous Soul'}
                </h3>
                <p className="text-xs text-white/80">
                  {formatDistanceToNow(story.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
            
            {/* Audio Player */}
            <div className="my-3">
              <audio src={story.audioUrl} controls className="w-full" />
            </div>
            
            {/* Emotion Tags */}
            {storyEmotions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {storyEmotions.map(emotion => (
                  <EmotionTag 
                    key={emotion.id} 
                    emotion={emotion} 
                    small 
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Response Form */}
          <div className="space-y-2">
            <h3 className="font-medium">Leave a Response</h3>
            <Textarea
              placeholder="Share your thoughts..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={3}
            />
            <Button 
              className="w-full bg-soulcast-purple hover:bg-soulcast-purple/90 text-white"
              onClick={handleSubmitResponse}
            >
              Respond
            </Button>
          </div>
          
          {/* Responses */}
          <div className="space-y-2">
            <h3 className="font-medium">
              Responses {story.responses.length > 0 && `(${story.responses.length})`}
            </h3>
            {story.responses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No responses yet. Be the first to respond!</p>
            ) : (
              <div className="space-y-3">
                {story.responses.map(response => (
                  <div key={response.id} className="bg-muted p-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{response.anonymousName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(response.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    <p className="mt-1">{response.content}</p>
                  </div>
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

export default StoryDetail;
