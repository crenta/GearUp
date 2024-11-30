import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapPage = () => {
  const [selectedType, setSelectedType] = useState('gas');

  const locations = {
    gas: [
      { id: 1, title: 'Chevron - Perkins Rd', coordinate: { latitude: 30.403489, longitude: -91.117144 } },
      { id: 2, title: 'Shell - College Dr', coordinate: { latitude: 30.418294, longitude: -91.138300 } },
      { id: 3, title: 'Exxon - Government St', coordinate: { latitude: 30.448376, longitude: -91.155542 } },
      { id: 4, title: 'Circle K - Highland Rd', coordinate: { latitude: 30.378403, longitude: -91.098564 } },
      { id: 5, title: 'RaceTrac - Siegen Ln', coordinate: { latitude: 30.389812, longitude: -91.066735 } },
      { id: 6, title: 'Murphy USA - Airline Hwy', coordinate: { latitude: 30.452639, longitude: -91.072915 } },
    ],
    oil: [
      { id: 7, title: 'Jiffy Lube - Siegen Ln', coordinate: { latitude: 30.383482, longitude: -91.059389 } },
      { id: 8, title: 'Take 5 Oil Change - Perkins Rd', coordinate: { latitude: 30.397799, longitude: -91.105167 } },
      { id: 9, title: 'Valvoline Instant Oil Change - Burbank Dr', coordinate: { latitude: 30.351024, longitude: -91.141325 } },
      { id: 10, title: 'Goodyear Auto Service - Florida Blvd', coordinate: { latitude: 30.450872, longitude: -91.103972 } },
      { id: 11, title: 'Express Oil Change - Bluebonnet Blvd', coordinate: { latitude: 30.383123, longitude: -91.091817 } },
    ],
    repair: [
      { id: 12, title: 'Firestone Complete Auto Care', coordinate: { latitude: 30.405567, longitude: -91.082465 } },
      { id: 13, title: 'Pep Boys - Baton Rouge', coordinate: { latitude: 30.416662, longitude: -91.138885 } },
      { id: 14, title: 'Meineke Car Care Center', coordinate: { latitude: 30.407654, longitude: -91.097091 } },
      { id: 15, title: 'Christian Brothers Automotive - Highland', coordinate: { latitude: 30.374852, longitude: -91.105651 } },
      { id: 16, title: 'Midas - Baton Rouge', coordinate: { latitude: 30.443522, longitude: -91.128414 } },
      { id: 17, title: 'Goodyear Auto Service - Sherwood Forest Blvd', coordinate: { latitude: 30.446373, longitude: -91.050482 } },
    ],
    painting: [
      { id: 18, title: 'Maaco Auto Body Shop & Painting', coordinate: { latitude: 30.429073, longitude: -91.055647 } },
      { id: 19, title: 'Earl Scheib Paint & Body', coordinate: { latitude: 30.446893, longitude: -91.093778 } },
      { id: 20, title: 'Body Kreations', coordinate: { latitude: 30.405320, longitude: -91.098765 } },
      { id: 21, title: 'Xtreme Auto Collision & Paint', coordinate: { latitude: 30.387982, longitude: -91.072317 } },
    ],
  };

  // Convert lat/long to relative position on the map image
  const getPosition = (coordinate) => {
    const mapBounds = {
      minLat: 30.351024, // southernmost point
      maxLat: 30.452639, // northernmost point
      minLng: -91.155542, // westernmost point
      maxLng: -91.050482, // easternmost point
    };

    const x = ((coordinate.longitude - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - coordinate.latitude) / (mapBounds.maxLat - mapBounds.minLat)) * 100;

    return { x, y };
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.mapContainer}>
        <Image
          source={require('./assets/baton-rouge-map.png')}
          style={styles.map}
          resizeMode="cover"
        />

        {/* Location Pins */}
        {locations[selectedType].map((location) => {
          const position = getPosition(location.coordinate);
          return (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.pin,
                {
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }
              ]}
              onPress={() => alert(location.title)}
            >
              <Text style={styles.pinText}>📍</Text>
              <View style={styles.pinLabel}>
                <Text style={styles.pinLabelText}>{location.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.buttonContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity
            style={[styles.button, selectedType === 'gas' && styles.selected]}
            onPress={() => setSelectedType('gas')}
          >
            <Text style={styles.buttonText}>Gas Stations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedType === 'oil' && styles.selected]}
            onPress={() => setSelectedType('oil')}
          >
            <Text style={styles.buttonText}>Oil Change</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedType === 'repair' && styles.selected]}
            onPress={() => setSelectedType('repair')}
          >
            <Text style={styles.buttonText}>Repair Shops</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedType === 'painting' && styles.selected]}
            onPress={() => setSelectedType('painting')}
          >
            <Text style={styles.buttonText}>Painting Shops</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c34',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150,
  },
  pin: {
    position: 'absolute',
    transform: [{ translateX: -15 }, { translateY: -30 }],
    zIndex: 1,
  },
  pinText: {
    fontSize: 30,
  },
  pinLabel: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 4,
    borderRadius: 4,
    width: 120,
    top: -30,
    left: -45,
  },
  pinLabelText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#1c1c24',
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#1c1c24',
    borderWidth: 1,
    borderColor: '#e33d6e',
    marginHorizontal: 4,
    minWidth: 100,
  },
  selected: {
    backgroundColor: '#e33d6e',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default MapPage;
