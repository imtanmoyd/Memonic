
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:shadow-lg group">
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br",
          color
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
