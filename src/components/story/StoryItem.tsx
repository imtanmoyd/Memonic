
import React from 'react';
import { Story } from '@/types';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { emotions } from '../EmotionSelector';
import EmotionTag from '../EmotionTag';
import { MapPin, MessageCircle } from 'lucide-react';

interface StoryItemProps {
  story: Story;
  distance?: number;
}

const StoryItem: React.FC<StoryItemProps> = ({ story, distance }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/story/${story.id}`);
  };
  
  const storyEmotions = emotions.filter(e => story.emotions.includes(e.id));
  
  return (
    <div 
      className="story-bubble mb-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">
            {story.anonymousName || 'Anonymous Soul'}
          </h3>
          <p className="text-xs text-white/80">
            {formatDistanceToNow(story.timestamp, { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-xs text-white/80">
            <MessageCircle className="w-3 h-3 mr-1" />
            {story.responses.length}
          </span>
          {distance !== undefined && (
            <span className="flex items-center text-xs text-white/80">
              <MapPin className="w-3 h-3 mr-1" />
              {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`}
            </span>
          )}
        </div>
      </div>
      
      {/* Audio Player */}
      <div className="my-3">
        <audio 
          src={story.audioUrl} 
          controls 
          className="w-full h-10" 
          onClick={e => e.stopPropagation()}
        />
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
  );
};

export default StoryItem;
