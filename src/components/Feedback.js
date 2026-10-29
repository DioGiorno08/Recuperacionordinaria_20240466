import React from 'react';
import { View, Text, Image, ActivityIndicator, Pressable, StyleSheet } from 'react-native';

export default function Feedback({ loading = false, message, onRetry }) {
  return (
    <View style={[styles.container, loading && styles.loading]} accessibilityLiveRegion="polite">
      {loading && <>
        <Image source={require('../../assets/image.png')} style={styles.logo}
          resizeMode="contain" accessibilityLabel="Logo del Instituto Técnico Ricaldone" />
        <ActivityIndicator size="large" color="#f9c400" />
      </>}
      <Text style={[styles.message, loading && styles.loadingMessage]}>{message}</Text>
      {onRetry && <Pressable accessibilityRole="button" style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 28, alignItems: 'center' },
  loading: { flex: 1, justifyContent: 'center', backgroundColor: '#1d1d1b' },
  logo: { width: '100%', maxWidth: 260, height: 260, marginBottom: 28 },
  message: { color: '#374151', textAlign: 'center', marginTop: 14, lineHeight: 22 },
  loadingMessage: { color: '#fff' },
  button: { backgroundColor: '#10243a', padding: 15, borderRadius: 12, marginTop: 18 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
