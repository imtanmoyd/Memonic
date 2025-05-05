
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showNotifications = true }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {showNotifications && (
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
      )}
    </header>
  );
};

export default Header;
