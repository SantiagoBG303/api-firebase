import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../hooks/useAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Completa los campos');
    if (password.length < 6) return Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
    if (password !== confirm) return Alert.alert('Error', 'Las contraseñas no coinciden');
    try {
      await register(email, password);
      navigation.replace('Home');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo crear la cuenta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Input placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secure />
      <Input placeholder="Confirmar contraseña" value={confirm} onChangeText={setConfirm} secure />
      <PrimaryButton title="Registrarme" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#eaf2ff' },
  title: { fontSize: 26, fontWeight: '800', color: '#0b3b8c', marginBottom: 12 }
});

export default RegisterScreen;
