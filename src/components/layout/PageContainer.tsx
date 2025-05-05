
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto max-w-md min-h-[100dvh] pb-16 pt-4 px-4 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
