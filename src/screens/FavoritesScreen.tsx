import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getFavoritesByUser, removeFavorite } from '../services/firestore';
import { useAuth } from '../hooks/useAuth';

const FavoritesScreen: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const res = await getFavoritesByUser(user.uid);
    setItems(res as any[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await removeFavorite(id);
      await load();
    } catch (err) { Alert.alert('Error', 'No se pudo eliminar'); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0b3b8c" />
        </View>
      ) : items.length === 0 ? (
        <View style={{ padding: 20 }}>
          <Text>No tienes favoritos aún. Añade personajes desde la pantalla principal.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>{item.date?.toDate ? item.date.toDate().toLocaleString() : ''}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.delBtn}><Text style={{color:'#fff'}}>Eliminar</Text></TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f9ff' },
  title: { fontSize: 22, fontWeight: '800', padding: 16, color: '#0b3b8c' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginVertical: 8, borderRadius: 10 },
  img: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  name: { fontWeight: '700' },
  date: { color: '#666', fontSize: 12 },
  delBtn: { backgroundColor: '#d9534f', padding: 8, borderRadius: 8 }
});

export default FavoritesScreen;
