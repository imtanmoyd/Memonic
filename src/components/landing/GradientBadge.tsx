
import React from 'react';

interface GradientBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const GradientBadge: React.FC<GradientBadgeProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`inline-block relative ${className}`}>
      <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 rounded-full text-white text-sm font-medium">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 rounded-full blur-xl opacity-30 -z-10"></div>
    </div>
  );
};

export default GradientBadge;
