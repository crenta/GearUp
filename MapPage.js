// Import necessary dependencies from React and React Native
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapPage = () => {
  // State for tracking selected location type (gas, oil, repair, painting)
  const [selectedType, setSelectedType] = useState('gas');
  // State for storing reference to the map component
  const [mapRef, setMapRef] = useState(null);

  // Define location data for different service types with coordinates in Baton Rouge area
  const locations = {
    // Gas station locations
    gas: [
      { id: 1, title: 'Chevron - Perkins Rd', coordinate: { latitude: 30.403489, longitude: -91.117144 } },
      { id: 2, title: 'Shell - College Dr', coordinate: { latitude: 30.418294, longitude: -91.138300 } },
      { id: 3, title: 'Exxon - Government St', coordinate: { latitude: 30.448376, longitude: -91.155542 } },
      { id: 4, title: 'Circle K - Highland Rd', coordinate: { latitude: 30.378403, longitude: -91.098564 } },
      { id: 5, title: 'RaceTrac - Siegen Ln', coordinate: { latitude: 30.389812, longitude: -91.066735 } },
      { id: 6, title: 'Murphy USA - Airline Hwy', coordinate: { latitude: 30.452639, longitude: -91.072915 } },
    ],
    // Oil change service locations
    oil: [
      { id: 7, title: 'Jiffy Lube - Siegen Ln', coordinate: { latitude: 30.383482, longitude: -91.059389 } },
      { id: 8, title: 'Take 5 Oil Change - Perkins Rd', coordinate: { latitude: 30.397799, longitude: -91.105167 } },
      { id: 9, title: 'Valvoline Instant Oil Change - Burbank Dr', coordinate: { latitude: 30.351024, longitude: -91.141325 } },
      { id: 10, title: 'Goodyear Auto Service - Florida Blvd', coordinate: { latitude: 30.450872, longitude: -91.103972 } },
      { id: 11, title: 'Express Oil Change - Bluebonnet Blvd', coordinate: { latitude: 30.383123, longitude: -91.091817 } },
    ],
    // Auto repair shop locations
    repair: [
      { id: 12, title: 'Firestone Complete Auto Care', coordinate: { latitude: 30.405567, longitude: -91.082465 } },
      { id: 13, title: 'Pep Boys - Baton Rouge', coordinate: { latitude: 30.416662, longitude: -91.138885 } },
      { id: 14, title: 'Meineke Car Care Center', coordinate: { latitude: 30.407654, longitude: -91.097091 } },
      { id: 15, title: 'Christian Brothers Automotive - Highland', coordinate: { latitude: 30.374852, longitude: -91.105651 } },
      { id: 16, title: 'Midas - Baton Rouge', coordinate: { latitude: 30.443522, longitude: -91.128414 } },
      { id: 17, title: 'Goodyear Auto Service - Sherwood Forest Blvd', coordinate: { latitude: 30.446373, longitude: -91.050482 } },
    ],
    // Auto painting service locations
    painting: [
      { id: 18, title: 'Maaco Auto Body Shop & Painting', coordinate: { latitude: 30.429073, longitude: -91.055647 } },
      { id: 19, title: 'Earl Scheib Paint & Body', coordinate: { latitude: 30.446893, longitude: -91.093778 } },
      { id: 20, title: 'Body Kreations', coordinate: { latitude: 30.405320, longitude: -91.098765 } },
      { id: 21, title: 'Xtreme Auto Collision & Paint', coordinate: { latitude: 30.387982, longitude: -91.072317 } },
    ],
  };

// Initial map region centered on Baton Rouge area
const initialRegion = {
  latitude: 30.403489,
  longitude: -91.117144,
  latitudeDelta: 0.2,  // Controls zoom level
  longitudeDelta: 0.2,
};

  // Function to reset map to initial region
  const handleResetMap = () => {
    if (mapRef) {
      mapRef.animateToRegion(initialRegion, 1000);  // 1000ms animation duration
    }
  };

  return (
    // SafeAreaView ensures content is visible on notched devices
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.mapContainer}>
        {/* Main MapView component with Google Maps provider */}
        <MapView
          ref={(ref) => setMapRef(ref)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          zoomEnabled={true}
          minZoomLevel={12}
          maxZoomLevel={20}
          zoomControlEnabled={true}
        >
          {/* Map through selected location type and render markers */}
          {locations[selectedType].map((location) => (
            <Marker
              key={location.id}
              coordinate={location.coordinate}
              title={location.title}
              onPress={() => alert(location.title)}
            />
          ))}
        </MapView>

        {/* Bottom button container for filtering locations */}
        <View style={styles.buttonContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Gas stations filter button */}
            <TouchableOpacity
              style={[styles.button, selectedType === 'gas' && styles.selected]}
              onPress={() => setSelectedType('gas')}
            >
              <Text style={styles.buttonText}>Gas</Text>
            </TouchableOpacity>

            {/* Oil change locations filter button */}
            <TouchableOpacity
              style={[styles.button, selectedType === 'oil' && styles.selected]}
              onPress={() => setSelectedType('oil')}
            >
              <Text style={styles.buttonText}>Oil</Text>
            </TouchableOpacity>

            {/* Repair shops filter button */}
            <TouchableOpacity
              style={[styles.button, selectedType === 'repair' && styles.selected]}
              onPress={() => setSelectedType('repair')}
            >
              <Text style={styles.buttonText}>Repair</Text>
            </TouchableOpacity>

            {/* Paint shops filter button */}
            <TouchableOpacity
              style={[styles.button, selectedType === 'painting' && styles.selected]}
              onPress={() => setSelectedType('painting')}
            >
              <Text style={styles.buttonText}>Paint</Text>
            </TouchableOpacity>

            {/* Reset map view button */}
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleResetMap}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c34',  // Dark theme background
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#1c1c24',  // Dark theme background for buttons
    paddingVertical: 10,
    height: 65,
  },
  scrollContent: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#1c1c24',
    borderWidth: 1,
    borderColor: '#e33d6e',  // Pink accent color
    marginHorizontal: 2,
    minWidth: 70,
  },
  resetButton: {
    backgroundColor: '#e33d6e',  // Pink background for reset button
  },
  selected: {
    backgroundColor: '#e33d6e',  // Pink background for selected filter
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default MapPage;
