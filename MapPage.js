import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GoogleMapReact from 'google-map-react';

// Simple marker component
const Marker = ({ text }) => (
  <div style={{
    color: 'white',
    background: '#e33d6e', // Pink for markers
    padding: '8px 12px',
    borderRadius: '4px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
  }}>
    📍 {text}
  </div>
);

export default function App() {
  const [selectedType, setSelectedType] = useState('gas');

  // Updated location data for Baton Rouge
  const locations = {
    gas: [
      { id: 1, title: 'Chevron - Perkins Rd', lat: 30.403489, lng: -91.117144 },
      { id: 2, title: 'Shell - College Dr', lat: 30.418294, lng: -91.138300 },
      { id: 3, title: 'Exxon - Government St', lat: 30.448376, lng: -91.155542 },
      { id: 4, title: 'Circle K - Highland Rd', lat: 30.378403, lng: -91.098564 },
      { id: 5, title: 'RaceTrac - Siegen Ln', lat: 30.389812, lng: -91.066735 },
      { id: 6, title: 'Murphy USA - Airline Hwy', lat: 30.452639, lng: -91.072915 },
    ],
    oil: [
      { id: 7, title: 'Jiffy Lube - Siegen Ln', lat: 30.383482, lng: -91.059389 },
      { id: 8, title: 'Take 5 Oil Change - Perkins Rd', lat: 30.397799, lng: -91.105167 },
      { id: 9, title: 'Valvoline Instant Oil Change - Burbank Dr', lat: 30.351024, lng: -91.141325 },
      { id: 10, title: 'Goodyear Auto Service - Florida Blvd', lat: 30.450872, lng: -91.103972 },
      { id: 11, title: 'Express Oil Change - Bluebonnet Blvd', lat: 30.383123, lng: -91.091817 },
    ],
    repair: [
      { id: 12, title: 'Firestone Complete Auto Care', lat: 30.405567, lng: -91.082465 },
      { id: 13, title: 'Pep Boys - Baton Rouge', lat: 30.416662, lng: -91.138885 },
      { id: 14, title: 'Meineke Car Care Center', lat: 30.407654, lng: -91.097091 },
      { id: 15, title: 'Christian Brothers Automotive - Highland', lat: 30.374852, lng: -91.105651 },
      { id: 16, title: 'Midas - Baton Rouge', lat: 30.443522, lng: -91.128414 },
      { id: 17, title: 'Goodyear Auto Service - Sherwood Forest Blvd', lat: 30.446373, lng: -91.050482 },
    ],
    painting: [
      { id: 18, title: 'Maaco Auto Body Shop & Painting', lat: 30.429073, lng: -91.055647 },
      { id: 19, title: 'Earl Scheib Paint & Body', lat: 30.446893, lng: -91.093778 },
      { id: 20, title: 'Body Kreations', lat: 30.405320, lng: -91.098765 },
      { id: 21, title: 'Xtreme Auto Collision & Paint', lat: 30.387982, lng: -91.072317 },
    ],
  };

  // Map default settings
  const mapProps = {
    center: {
      lat: 30.4515,
      lng: -91.1871, // Baton Rouge coordinates
    },
    zoom: 12,
  };

  return (
    <View style={styles.container}>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }} // Add your Google Maps API key here
          defaultCenter={mapProps.center}
          defaultZoom={mapProps.zoom}
        >
          {locations[selectedType].map(location => (
            <Marker
              key={location.id}
              lat={location.lat}
              lng={location.lng}
              text={location.title}
            />
          ))}
        </GoogleMapReact>
      </div>

      <View style={styles.buttonContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#2c2c34', // Dark gray background for the app
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1c1c24', // Slightly lighter dark gray for button background
    zIndex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1c1c24', // Dark background for buttons
    borderWidth: 1,
    borderColor: '#e33d6e', // Pink border for buttons
    minWidth: 100,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#e33d6e', // Pink for selected button
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff', // White text for buttons
  },
});
