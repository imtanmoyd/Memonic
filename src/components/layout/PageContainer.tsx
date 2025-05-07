
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto max-w-6xl min-h-[100dvh] pb-20 pt-8 px-6 md:px-8 transition-all duration-300 ${className}`}>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
