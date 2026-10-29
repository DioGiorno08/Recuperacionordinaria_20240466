import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import InfoCard from './InfoCard';

export default function ShowCard({ show }) {
  return (
    <InfoCard title={show.name}>
      <View style={styles.row}>
        {show.image ? <Image source={{ uri: show.image }} style={styles.image}
          resizeMode="cover" accessibilityLabel={`Imagen de ${show.name}`} />
          : <View style={[styles.image, styles.placeholder]}><Text>Sin imagen</Text></View>}
        <View style={styles.details}>
          <Text style={styles.label}>Géneros</Text>
          <Text>{show.genres.join(', ') || 'No especificados'}</Text>
          <Text style={styles.label}>Inicio</Text>
          <Text>{show.premiered || 'No disponible'}</Text>
          <Text style={styles.label}>Final</Text>
          <Text>{show.ended || 'En emisión / no disponible'}</Text>
        </View>
      </View>
      <Text style={styles.label}>Resumen</Text>
      <Text style={styles.summary}>{show.summary || 'Sin resumen disponible'}</Text>
    </InfoCard>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 14 },
  image: { width: 105, height: 155, borderRadius: 9 },
  placeholder: { backgroundColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center' },
  details: { flex: 1 },
  label: { fontWeight: 'bold', color: '#234967', marginTop: 8 },
  summary: { lineHeight: 21, marginTop: 5, color: '#374151' },
});
