import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  style?: any;
};

const PrimaryButton: React.FC<Props> = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#0b3b8c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  text: { color: '#fff', fontWeight: '700' }
});

export default PrimaryButton;
