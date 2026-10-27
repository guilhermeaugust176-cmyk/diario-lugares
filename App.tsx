import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { Place } from './src/types';
import { PlaceRepository } from './src/repositories/PlaceRepository';
import { PlaceForm } from './src/components/PlaceForm';
import { PlaceList } from './src/components/PlaceList';

export default function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlaces = async () => {
    try {
      const storedPlaces = await PlaceRepository.getAll();
      setPlaces(storedPlaces);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleSavePlace = async (newPlace: any) => {
    try {
      const updatedPlaces = await PlaceRepository.save(newPlace);
      setPlaces(updatedPlaces);
    } catch (error) {
      alert('Erro ao guardar o local no dispositivo.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>📖 Diário de Lugares</Text>
        <Text style={styles.subtitle}>SENAI Agudos · Registos com Câmera e GPS</Text>

        <PlaceForm onSave={handleSavePlace} />

        <Text style={styles.sectionTitle}>Registos Guardados ({places.length})</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#1565c0" style={{ marginTop: 20 }} />
        ) : (
          <PlaceList places={places} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    color: '#1565c0',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
});