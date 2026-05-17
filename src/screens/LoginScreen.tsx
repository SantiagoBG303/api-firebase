import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../hooks/useAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Ingresa email y contraseña');
    try {
      await login(email, password);
      navigation.replace('Home');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DisneyVerse</Text>
      <Text style={styles.subtitle}>Bienvenido — inicia sesión</Text>
      <Input placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secure />
      <PrimaryButton title="Iniciar sesión" onPress={handleLogin} style={{ marginTop: 12 }} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#0b3b8c' }}>¿No tienes cuenta? Crear una</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#eaf2ff' },
  title: { fontSize: 34, fontWeight: '800', color: '#0b3b8c' },
  subtitle: { color: '#333', marginVertical: 8 }
});

export default LoginScreen;
