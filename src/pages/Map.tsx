import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import useLocation from '@/hooks/useLocation';
import useStoriesManagement from '@/hooks/useStoriesManagement';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Story } from '@/types';
import { emotions } from '@/components/EmotionSelector';

const MapUpdater = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const map = useMap();
  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 15);
    }
  }, [latitude, longitude, map]);
  return null;
};

const customIcon = new L.Icon({
  iconUrl: '/icons/map-pointer3.png',
  iconSize: [60, 60],
  iconAnchor: [20, 45],
  popupAnchor: [0, -45],
});

const Map = () => {
  const { latitude, longitude, loading: locationLoading } = useLocation();
  const { nearbyStories, getNearbyStories } = useStoriesManagement();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (latitude && longitude) {
      getNearbyStories(latitude, longitude, 5);
    }
  }, [latitude, longitude, getNearbyStories]);

  return (
    <>
      <PageContainer>
        <Header title="Nearby Stories" />

        {locationLoading || !latitude || !longitude ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p>Loading your location...</p>
          </div>
        ) : (
          <div className="h-[60vh] rounded-xl overflow-hidden">
            <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
              <MapUpdater latitude={latitude} longitude={longitude} />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              {nearbyStories.map(story => (
                <Marker
                  key={story.id}
                  position={[story.latitude, story.longitude]}
                  icon={customIcon}
                  eventHandlers={{ click: () => setSelectedStory(story) }}
                >
                  <Popup>
                    <strong>{story.anonymousName}</strong>
                    <audio src={story.audioUrl} controls className="w-full my-2" />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {story.emotions.map(emotionId => {
                        const emotion = emotions.find(e => e.id === emotionId);
                        return emotion ? (
                          <span
                            key={emotion.id}
                            className={`px-2 py-0.5 text-xs rounded-full bg-${emotion.color}/10 text-${emotion.color}-700`}
                          >
                            {emotion.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-medium mb-2">Stories in this area</h3>
          <div className="space-y-2">
            {nearbyStories.length === 0 ? (
              <p className="text-muted-foreground text-sm">No stories found nearby.</p>
            ) : (
              nearbyStories.map(story => (
                <Button
                  key={story.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setSelectedStory(story)}
                >
                  {story.anonymousName}
                </Button>
              ))
            )}
          </div>
        </div>
      </PageContainer>
      <NavigationBar />
    </>
  );
};

export default Map;
