import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  secure?: boolean;
  keyboardType?: any;
};

const Input: React.FC<Props> = ({ placeholder, value, onChangeText, secure, keyboardType }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secure}
    keyboardType={keyboardType}
    style={styles.input}
    placeholderTextColor="#888"
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#eee'
  }
});

export default Input;
