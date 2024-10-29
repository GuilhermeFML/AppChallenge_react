import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Definição da interface Pharmacy
interface Pharmacy {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Lista de farmácias com dados simulados
const pharmacies: Pharmacy[] = [
  { id: '1', name: 'Farmácia A', latitude: -23.512, longitude: -46.627 },
  { id: '2', name: 'Farmácia B', latitude: -23.515, longitude: -46.629 },
];

export default function PharmacyMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos da sua localização para continuar.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log("Localização obtida:", loc); // Log da localização
      setLocation(loc);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true} // Exibe a localização do usuário
            showsMyLocationButton={true} // Botão para localização
          >
            {/* Marcadores de Farmácias */}
            {pharmacies.map(pharmacy => (
              <Marker
                key={pharmacy.id}
                coordinate={{ latitude: pharmacy.latitude, longitude: pharmacy.longitude }}
                title={pharmacy.name}
              />
            ))}
          </MapView>
        ) : (
          <Text>Obtendo localização...</Text>
        )}
      </View>

      {/* Lista de Farmácias */}
      <View style={styles.listContainer}>
        <Text style={styles.title}>Farmácias Perto de Você</Text>
        <FlatList
          data={pharmacies}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.pharmacyItem}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pharmacyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
