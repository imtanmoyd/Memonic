
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, MapPin, MessageCircle, User } from 'lucide-react';

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-around py-2">
          <NavButton to="/" icon={<Home className="w-6 h-6" />} label="Discover" />
          <NavButton to="/record" icon={<MessageCircle className="w-6 h-6" />} label="Record" />
          <NavButton to="/map" icon={<MapPin className="w-6 h-6" />} label="Map" />
          <NavButton to="/profile" icon={<User className="w-6 h-6" />} label="Profile" />
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex flex-col items-center justify-center px-2 transition-colors ${
          isActive ? 'text-soulcast-purple' : 'text-muted-foreground'
        }`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export default NavigationBar;
