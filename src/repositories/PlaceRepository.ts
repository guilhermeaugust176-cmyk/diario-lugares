import AsyncStorage from '@react-native-async-storage/async-storage';
import { Place, NewPlace } from '../types';

const STORAGE_KEY = '@diario-de-lugares:places';

export const PlaceRepository = {
  // Procura todos os locais guardados
  async getAll(): Promise<Place[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Erro ao procurar os locais:', error);
      return [];
    }
  },

  // Guarda um novo local e devolve a lista atualizada
  async save(newPlace: NewPlace): Promise<Place[]> {
    try {
      const currentPlaces = await this.getAll();
      const placeToSave: Place = {
        ...newPlace,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleDateString('pt-BR'),
      };

      const updatedPlaces = [placeToSave, ...currentPlaces];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlaces));
      return updatedPlaces;
    } catch (error) {
      console.error('Erro ao guardar o local:', error);
      throw error;
    }
  },
};