import React from 'react';
import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';

export default function Feedback({ loading = false, message, onRetry }) {
  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      {loading && <ActivityIndicator size="large" color="#10243a" />}
      <Text style={styles.message}>{message}</Text>
      {onRetry && <Pressable accessibilityRole="button" style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 28, alignItems: 'center' },
  message: { color: '#374151', textAlign: 'center', marginTop: 14, lineHeight: 22 },
  button: { backgroundColor: '#10243a', padding: 15, borderRadius: 12, marginTop: 18 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
