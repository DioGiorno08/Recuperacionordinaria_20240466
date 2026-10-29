import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ShowsScreen from './src/screens/ShowsScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#10243a' },
          headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' },
        }}>
          <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Instituto Técnico Ricaldone' }} />
          <Stack.Screen name="Series" component={ShowsScreen} options={{ title: 'Catálogo de series' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
