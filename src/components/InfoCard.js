import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 18, marginVertical: 10, elevation: 3 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#10243a', marginBottom: 12 },
});
