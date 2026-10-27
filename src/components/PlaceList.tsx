import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Place } from '../types';

type Props = {
  places: Place[];
};

export const PlaceList = ({ places }: Props) => {
  if (places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum local registrado ainda.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {places.map((item) => (
        <View key={item.id} style={styles.card}>
          {item.photoUri && (
            <Image source={{ uri: item.photoUri }} style={styles.image} />
          )}
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
            {item.latitude !== null && item.longitude !== null && (
              <Text style={styles.coords}>
                📍 Lat: {item.latitude.toFixed(4)} | Long: {item.longitude.toFixed(4)}
              </Text>
            )}
            <Text style={styles.date}>Criado em: {item.createdAt}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  content: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  note: {
    fontSize: 14,
    color: '#555',
  },
  coords: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  date: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
});