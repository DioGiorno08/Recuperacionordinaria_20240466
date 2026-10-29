import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard';
import { student } from '../config/student';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={[styles.page, { paddingBottom: 24 + insets.bottom }]}>
      <Image source={require('../../assets/logo-ricaldone.png')} style={styles.logo}
        resizeMode="contain" accessibilityLabel="Logo del Instituto Técnico Ricaldone" />
      <Text style={styles.heading}>{student.institution}</Text>
      <Text style={styles.subtitle}>Desarrollo de Software</Text>
      <InfoCard title="Información del estudiante">
        {[
          ['Nombre completo', student.name], ['Carnet', student.carnet],
          ['Sección', student.section], ['Grupo', student.group], ['Actividad', student.activity],
        ].map(([label, value]) => (
          <View key={label} style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </InfoCard>
      <Pressable accessibilityRole="button" style={styles.button} onPress={() => navigation.navigate('Series')}>
        <Text style={styles.buttonText}>Ver series de TVMaze →</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: '#edf2f7', flexGrow: 1 },
  logo: { width: '100%', maxWidth: 300, height: 110, alignSelf: 'center', marginTop: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#10243a', textAlign: 'center', marginTop: 18 },
  subtitle: { textAlign: 'center', color: '#526173', marginTop: 8, marginBottom: 20 },
  field: { marginBottom: 13 },
  label: { fontWeight: 'bold', color: '#526173' },
  value: { fontSize: 16, color: '#14283e', marginTop: 3, lineHeight: 23 },
  button: { backgroundColor: '#10243a', padding: 18, borderRadius: 12, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 17, fontWeight: 'bold' },
});
