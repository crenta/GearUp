import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const MyCarPage = () => {
  // Initialize default vehicle data
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      year: '2020',
      make: 'Toyota',
      model: 'Camry',
      image: null,
      miles: '15000',
      licensePlate: 'ABC123',
      lastOilChange: '2024-01-15',
      nextOilChange: '2024-04-15',
      insurance: {
        provider: 'State Farm',
        policyNumber: 'POL123456',
        expiryDate: '2024-12-31'
      },
      lastInspection: '2023-12-01',
      nextInspection: '2024-12-01',
      vinNumber: '1HGCM82633A123456',
      registrationExpiry: '2024-10-15',
    },
  ]);
  // currently selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [editing, setEditing] = useState(false);

  // handler for entering edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  // handler for saving changes to a vehicle
  const handleSave = () => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) =>
        v.id === selectedVehicle.id
          ? { ...selectedVehicle }
          : v
      )
    );
    setEditing(false);
  };

  // handler for adding a new vehicle
  const handleAddVehicle = () => {
    const newVehicle = {
      id: (vehicles.length + 1).toString(),
      year: '',
      make: '',
      model: '',
      image: null,
      miles: '',
      licensePlate: '',
      lastOilChange: '',
      nextOilChange: '',
      insurance: {
        provider: '',
        policyNumber: '',
        expiryDate: ''
      },
      lastInspection: '',
      nextInspection: '',
      vinNumber: '',
      registrationExpiry: '',
    };
    setVehicles([...vehicles, newVehicle]);
    setSelectedVehicle(newVehicle);
    setEditing(true);
  };

  // handler for picking and uploading vehicle images
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.length > 0) {
          const updatedVehicle = { ...selectedVehicle, image: response.assets[0].uri };
          setSelectedVehicle(updatedVehicle);
          setVehicles(prevVehicles =>
            prevVehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v)
          );
        }
      }
    );
  };

  // displaying/editing vehicle information fields
  const InfoField = ({ label, value, editable, onChangeText, placeholder }) => (
    <View style={styles.infoField}>
      <Text style={styles.label}>{label}:</Text>
      {editing && editable ? (
        <TextInput
          style={styles.input}
          placeholder={placeholder || label}
          placeholderTextColor="#ccc"
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <Text style={styles.infoText}>{value || 'Not set'}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.vehicleList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.vehicleItem, item.id === selectedVehicle.id && styles.selectedVehicle]}
            onPress={() => {
              setSelectedVehicle(item);
              setEditing(false);
            }}
          >
            <View style={styles.vehicleContent}>
              <Text style={styles.vehicleText}>
                {item.year} {item.make} {item.model}
              </Text>
              <Image
                source={item.image ? { uri: item.image } : require('./assets/car.png')}
                style={styles.vehicleThumbnail}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Main content area */}
      <ScrollView style={styles.scrollContent}>
        {/* Basic vehicle information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>
          <InfoField
            label="Year"
            value={selectedVehicle.year}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, year: text })}
          />
          <InfoField
            label="Make"
            value={selectedVehicle.make}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, make: text })}
          />
          <InfoField
            label="Model"
            value={selectedVehicle.model}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, model: text })}
          />
          <InfoField
            label="License Plate"
            value={selectedVehicle.licensePlate}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, licensePlate: text })}
          />
          <InfoField
            label="VIN Number"
            value={selectedVehicle.vinNumber}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, vinNumber: text })}
          />
        </View>

        {/* Vehicle image upload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Image</Text>
          <Image
            source={selectedVehicle.image ? { uri: selectedVehicle.image } : require('./assets/car.png')}
            style={styles.carImage}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* Maintenance information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance Information</Text>
          <InfoField
            label="Current Mileage"
            value={selectedVehicle.miles}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, miles: text })}
          />
          <InfoField
            label="Last Oil Change"
            value={selectedVehicle.lastOilChange}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, lastOilChange: text })}
          />
          <InfoField
            label="Next Oil Change Due"
            value={selectedVehicle.nextOilChange}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, nextOilChange: text })}
          />
          <InfoField
            label="Last Inspection"
            value={selectedVehicle.lastInspection}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, lastInspection: text })}
          />
          <InfoField
            label="Next Inspection Due"
            value={selectedVehicle.nextInspection}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({ ...selectedVehicle, nextInspection: text })}
          />
        </View>

        {/* Insurance details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>
          <InfoField
            label="Insurance Provider"
            value={selectedVehicle.insurance.provider}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({
              ...selectedVehicle,
              insurance: { ...selectedVehicle.insurance, provider: text }
            })}
          />
          <InfoField
            label="Policy Number"
            value={selectedVehicle.insurance.policyNumber}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({
              ...selectedVehicle,
              insurance: { ...selectedVehicle.insurance, policyNumber: text }
            })}
          />
          <InfoField
            label="Policy Expiry"
            value={selectedVehicle.insurance.expiryDate}
            editable={true}
            onChangeText={(text) => setSelectedVehicle({
              ...selectedVehicle,
              insurance: { ...selectedVehicle.insurance, expiryDate: text }
            })}
          />
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          {editing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edit Information</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
            <Text style={styles.buttonText}>Add New Vehicle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c34',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  vehicleList: {
    maxHeight: 120,
    backgroundColor: '#1c1c24',
    padding: 8,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1c1c24',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  infoField: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e33d6e',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#2c2c34',
    color: '#fff',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    padding: 12,
    backgroundColor: '#2c2c34',
    borderRadius: 8,
  },
  carImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 32,
  },
  uploadButton: {
    backgroundColor: '#e33d6e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#e33d6e',
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#097cfa',
    padding: 12,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#097cfa',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vehicleItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#097cfa',
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#1c1c24',
    alignItems: 'center',
    width: 120,
  },
  selectedVehicle: {
    borderColor: '#e33d6e',
    backgroundColor: '#2c2c34',
  },
  vehicleContent: {
    alignItems: 'center',
  },
  vehicleText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8,
  },
  vehicleThumbnail: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default MyCarPage;
