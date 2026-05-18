import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import PrimaryButton from '../components/PrimaryButton';
import { addFavorite } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { character } = route.params;
  const { user } = useAuth();

  const saveFavorite = async () => {
    if (!user) return Alert.alert('Error', 'Necesitas iniciar sesión');
    try {
      await addFavorite(user.uid, { name: character.name, image: character.imageUrl || character.image });
      Alert.alert('Guardado', 'Favorito agregado');
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: character.imageUrl || character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.sectionTitle}>Películas</Text>
      <Text style={styles.text}>{(character.films || []).join(', ') || '—'}</Text>
      <Text style={styles.sectionTitle}>Series</Text>
      <Text style={styles.text}>{(character.tvShows || []).join(', ') || '—'}</Text>
      <View style={{ marginTop: 18 }}>
        <PrimaryButton title="Agregar a favoritos" onPress={saveFavorite} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fbff' },
  image: { width: '100%', height: 360, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '800', color: '#0b3b8c' },
  sectionTitle: { marginTop: 12, fontWeight: '700' },
  text: { color: '#444', marginTop: 6 }
});

export default DetailsScreen;
