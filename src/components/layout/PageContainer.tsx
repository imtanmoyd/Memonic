
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto max-w-4xl min-h-[100dvh] pb-16 pt-8 px-6 transition-all duration-300 ${className}`}>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl p-6">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
