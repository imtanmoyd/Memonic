
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, User, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import NavigationBar from '@/components/layout/NavigationBar';
import Header from '@/components/layout/Header';
import FeatureCard from '@/components/landing/FeatureCard';
import GradientBadge from '@/components/landing/GradientBadge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  return (
    <>
      <PageContainer className="landing-page">
        <Header title="Memomic" />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-soulcast-purple to-soulcast-lavender p-8 md:p-12 mb-12">
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-8">
              <GradientBadge>The World of Memos</GradientBadge>
              <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-white">
                Your memories, mapped and meaningful
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                Memomic is where your life's moments become location-anchored memories
                that you can revisit, share, or keep private.
              </p>
              
              <div className="flex gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="bg-white text-soulcast-purple hover:bg-white/90"
                  asChild
                >
                  <Link to="/map">Explore Map</Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                  asChild
                >
                  <Link to="/record">Create Memo</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FeatureCard 
            title="Drop Memos On The Map" 
            description="Create location-based memories with text, voice, or images that stay anchored to places that matter to you."
            icon={<MapPin className="w-8 h-8" />}
            color="from-blue-500 to-cyan-400"
          />
          <FeatureCard 
            title="Express Your Emotions" 
            description="Tag your memos with emotions to capture how you felt in that moment and place."
            icon={<MessageCircle className="w-8 h-8" />}
            color="from-purple-500 to-pink-400"
          />
          <FeatureCard 
            title="Connect With Friends" 
            description="Share private memos with your close circle or discover public memories from around the world."
            icon={<User className="w-8 h-8" />}
            color="from-amber-500 to-orange-400"
          />
          <FeatureCard 
            title="Journey Through Memories" 
            description="Use Compass mode to navigate to your past memos like a memory walk through time and space."
            icon={<Compass className="w-8 h-8" />}
            color="from-emerald-500 to-green-400"
          />
        </div>
        
        {/* Memo Demo Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What is a Memo?</h2>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <p className="text-lg mb-4">
                  A Memo is your personal capsule of a moment, anchored to a specific place and enriched with emotion.
                </p>
                <ul className="space-y-2">
                  {["Text stories or emotional notes", "Voice confessions", "Images of the place or feeling", "Location tags", "Emotion indicators"].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center bg-soulcast-purple/20 text-soulcast-purple">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex-1">
                <div className="story-bubble p-6 shadow-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-white">Sunset at Golden Gate</h4>
                      <p className="text-xs text-white/80">2 hours ago • Public</p>
                    </div>
                    <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                      Nostalgic
                    </div>
                  </div>
                  
                  <div className="mb-3 relative">
                    <AspectRatio ratio={16 / 9}>
                      <div className="w-full h-full rounded-lg bg-gradient-to-t from-purple-900 to-orange-400 flex items-center justify-center">
                        <span className="text-white opacity-50">Photo</span>
                      </div>
                    </AspectRatio>
                  </div>
                  
                  <p className="text-white/90 text-sm">
                    The way the light hit the bridge today reminded me of that summer we spent exploring the city. Some places just hold more than memories.
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="h-4 w-4 text-white/70" />
                    <span className="text-xs text-white/70">Golden Gate View Point</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center py-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to map your memories?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
            Start dropping memos at places that matter and build your personal map of moments.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-soulcast-purple to-blue-500 hover:opacity-90 text-white px-8"
            asChild
          >
            <Link to="/record">Create Your First Memo</Link>
          </Button>
        </div>
      </PageContainer>
      <NavigationBar />
    </>
  );
};

export default Index;
