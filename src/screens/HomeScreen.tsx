import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useAuth } from '../hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout, user } = useAuth();

  const load = async (p = 1, q = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCharacters(p, q);
      setData(p === 1 ? res.data : [...data, ...res.data]);
    } catch (err: any) {
      console.warn(err);
      setError(err.message || 'Error al cargar personajes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1, ''); }, []);

  const onSearch = () => { setPage(1); load(1, query); };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0b3b8c', '#2a66c8']} style={styles.header}>
        <Text style={styles.title}>DisneyVerse</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Text style={{ color: '#fff', marginRight: 12 }}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => { await logout(); navigation.replace('Login'); }}>
            <Text style={{ color: '#fff' }}>Salir</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.searchBox}>
        <TextInput placeholder="Buscar personajes" value={query} onChangeText={setQuery} style={styles.searchInput} />
        <TouchableOpacity onPress={onSearch} style={styles.searchBtn}><Text style={{color:'#fff'}}>Buscar</Text></TouchableOpacity>
      </View>

      {loading && data.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0b3b8c" />
        </View>
      ) : error ? (
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#d9534f' }}>{error}</Text>
        </View>
      ) : (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || item.id}
        renderItem={({ item }) => (
          <CharacterCard item={item} onPress={() => navigation.navigate('Details', { character: item })} />
        )}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={() => { setPage(p => { const np = p + 1; load(np, query); return np; }); }}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f9ff' },
  header: { backgroundColor: '#0b3b8c', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 20, fontWeight: '800' },
  searchBox: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  searchInput: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 10, marginRight: 8 },
  searchBtn: { backgroundColor: '#0b3b8c', padding: 10, borderRadius: 8 }
});

export default HomeScreen;
