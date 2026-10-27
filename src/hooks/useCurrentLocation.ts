import { useState } from 'react';
import * as Location from 'expo-location';

export type LocationState = {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  errorMsg: string | null;
};

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    errorMsg: null,
  });

  const getLocation = async () => {
    setLocation((prev) => ({ ...prev, loading: true, errorMsg: null }));

    try {
      // Solicita a permissão de acesso ao GPS
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation({
          latitude: null,
          longitude: null,
          loading: false,
          errorMsg: 'Permissão para aceder à localização foi negada.',
        });
        return;
      }

      // Define um timer de 20 segundos para evitar travamentos
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tempo limite esgotado para obter a localização.')), 20000)
      );

      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentPosition = (await Promise.race([
        locationPromise,
        timeoutPromise,
      ])) as Location.LocationObject;

      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        loading: false,
        errorMsg: null,
      });
    } catch (error: any) {
      setLocation({
        latitude: null,
        longitude: null,
        loading: false,
        errorMsg: error.message || 'Erro ao obter a localização.',
      });
    }
  };

  return { ...location, getLocation };
};