import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// Botão reutilizável para manter o mesmo tamanho e acabamento em toda a aplicação
const ActionButton = ({ title, onPress, variant = 'primary' }) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 220,
    maxWidth: '100%',
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.18)',
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  secondary: {
    backgroundColor: '#0f766e',
  },
  danger: {
    backgroundColor: '#dc2626',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ActionButton;
