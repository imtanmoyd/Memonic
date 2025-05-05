
import React from 'react';
import EmotionTag, { Emotion } from './EmotionTag';

// Predefined emotions with tailwind color classes
export const emotions: Emotion[] = [
  { id: 'joy', name: 'Joy', color: 'yellow-400' },
  { id: 'calm', name: 'Calm', color: 'blue-400' },
  { id: 'sadness', name: 'Sadness', color: 'blue-600' },
  { id: 'anger', name: 'Anger', color: 'red-500' },
  { id: 'anxiety', name: 'Anxiety', color: 'orange-400' },
  { id: 'love', name: 'Love', color: 'pink-400' },
  { id: 'gratitude', name: 'Gratitude', color: 'green-500' },
  { id: 'confusion', name: 'Confusion', color: 'purple-400' },
  { id: 'hope', name: 'Hope', color: 'emerald-400' },
  { id: 'loneliness', name: 'Loneliness', color: 'gray-500' },
];

interface EmotionSelectorProps {
  selectedEmotions: string[];
  onChange: (emotions: string[]) => void;
  maxSelections?: number;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ 
  selectedEmotions, 
  onChange, 
  maxSelections = 3 
}) => {
  const toggleEmotion = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      onChange(selectedEmotions.filter(id => id !== emotionId));
    } else if (selectedEmotions.length < maxSelections) {
      onChange([...selectedEmotions, emotionId]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        How are you feeling? (Select up to {maxSelections})
      </div>
      <div className="flex flex-wrap gap-2">
        {emotions.map(emotion => (
          <EmotionTag
            key={emotion.id}
            emotion={emotion}
            selected={selectedEmotions.includes(emotion.id)}
            onClick={() => toggleEmotion(emotion.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;
