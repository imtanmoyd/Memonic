
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
}

interface UseLocationReturn extends LocationState {
  getCurrentLocation: () => Promise<void>;
}

const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: false,
    error: null,
  });

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        loading: false,
        error: null,
      });
    } catch (error) {
      let errorMessage = 'Failed to get your location';
      
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
      }
      
      setLocation(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      
      toast.error(errorMessage);
    }
  }, []);

  // Get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    ...location,
    getCurrentLocation,
  };
};

export default useLocation;
