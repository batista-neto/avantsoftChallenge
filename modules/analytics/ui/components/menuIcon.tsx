import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface mnuIconProps {
  onPress: () => void;
}

export const MenuIcon = ({ onPress }: mnuIconProps) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Ionicons name="menu" size={28} color="#333" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
});
