
import React from 'react';
import { cn } from '@/lib/utils';

export type Emotion = {
  id: string;
  name: string;
  color: string;
};

interface EmotionTagProps {
  emotion: Emotion;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;
}

const EmotionTag: React.FC<EmotionTagProps> = ({ 
  emotion, 
  selected = false, 
  onClick,
  small = false 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full transition-all',
        small ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        selected 
          ? `bg-${emotion.color} text-white` 
          : `bg-${emotion.color}/10 text-${emotion.color}-700 border border-${emotion.color}/30`,
        onClick && 'cursor-pointer hover:opacity-90'
      )}
    >
      {emotion.name}
    </button>
  );
};

export default EmotionTag;
