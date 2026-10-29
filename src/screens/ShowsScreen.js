import React from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFetchData from '../hooks/useFetchData';
import ShowCard from '../components/ShowCard';
import Feedback from '../components/Feedback';

export default function ShowsScreen() {
  const { shows, filteredShows, search, setSearch, loading, error, refetch } = useFetchData();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.page, { paddingBottom: insets.bottom }]}>
      <TextInput style={styles.input} placeholder="Buscar serie por nombre..."
        accessibilityLabel="Buscar serie por nombre" value={search} onChangeText={setSearch}
        autoCorrect={false} clearButtonMode="while-editing" />
      {loading && shows.length === 0 ? <Feedback loading message="Cargando series..." />
        : error ? <Feedback message={error} onRetry={refetch} />
        : <FlatList data={filteredShows} keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ShowCard show={item} />}
          initialNumToRender={6} windowSize={5} keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<Text style={styles.count}>{filteredShows.length} series disponibles · TVMaze</Text>}
          ListEmptyComponent={<Feedback message="No hay series que coincidan con tu búsqueda." />}
          refreshing={loading} onRefresh={refetch} />}
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, paddingHorizontal: 14, paddingTop: 15, backgroundColor: '#edf2f7' },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 10, color: '#10243a' },
  count: { color: '#53657b', marginVertical: 8 },
});
