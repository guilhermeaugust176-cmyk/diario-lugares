import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { NewPlace } from '../types';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { CameraView, useCameraPermissions } from 'expo-camera';

type Props = {
  onSave: (place: NewPlace) => void;
};

export const PlaceForm = ({ onSave }: Props) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);

  const { latitude, longitude, loading: locationLoading, errorMsg, getLocation } = useCurrentLocation();

  const handleTakePicture = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        alert('Permissão de câmera é necessária para tirar fotos.');
        return;
      }
    }
    setShowCamera(true);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      if (photo) {
        setPhotoUri(photo.uri);
        setShowCamera(false);
      }
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Por favor, informe um título para o local.');
      return;
    }

    if (!photoUri && (latitude === null || longitude === null)) {
      alert('A regra exige pelo menos uma Foto OU localização via GPS!');
      return;
    }

    onSave({
      title,
      note,
      photoUri,
      latitude,
      longitude,
    });

    setTitle('');
    setNote('');
    setPhotoUri(null);
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.cameraButtonContainer}>
            <Button title="Capturar Foto" onPress={takePhoto} color="#2e7d32" />
            <Button title="Cancelar" onPress={() => setShowCamera(false)} color="#c62828" />
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Local *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Cantina do SENAI"
      />

      <Text style={styles.label}>Anotações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={note}
        onChangeText={setNote}
        placeholder="Detalhes sobre este lugar..."
        multiline
      />

      <View style={styles.buttonRow}>
        <Button title="Tirar Foto 📸" onPress={handleTakePicture} color="#1565c0" />
        <Button title="Capturar GPS 📍" onPress={getLocation} color="#0288d1" />
      </View>

      {locationLoading && <ActivityIndicator style={{ marginTop: 8 }} color="#0288d1" />}
      {latitude !== null && longitude !== null && (
        <Text style={styles.gpsText}>
          GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </Text>
      )}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {photoUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.label}>Foto Registrada:</Text>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        </View>
      )}

      <View style={{ marginTop: 16 }}>
        <Button title="Salvar Registro" onPress={handleSave} color="#2e7d32" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  textArea: {
    height: 60,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  gpsText: {
    marginTop: 4,
    color: '#2e7d32',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
  },
  previewContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  cameraContainer: {
    height: 320,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 8,
  },
});