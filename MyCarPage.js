import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const MyCarPage = () => {
  const [vehicles, setVehicles] = useState([
    { id: '1', year: '2020', make: 'Toyota', model: 'Camry', image: null, miles: '15000' },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

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

  const handleAddVehicle = () => {
    const newVehicle = {
      id: (vehicles.length + 1).toString(),
      year: '',
      make: '',
      model: '',
      image: null,
      miles: '',
    };
    setVehicles([...vehicles, newVehicle]);
    setSelectedVehicle(newVehicle);
    setEditing(true);
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;

          // Update the selected vehicle
          const updatedVehicle = { ...selectedVehicle, image: selectedImage };
          setSelectedVehicle(updatedVehicle);

          // Update the vehicles array
          setVehicles((prevVehicles) =>
            prevVehicles.map((v) =>
              v.id === updatedVehicle.id ? updatedVehicle : v
            )
          );
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Vehicle Information */}
      {editing ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Year"
            placeholderTextColor="#ccc"
            value={selectedVehicle.year}
            onChangeText={(text) =>
              setSelectedVehicle({ ...selectedVehicle, year: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Make"
            placeholderTextColor="#ccc"
            value={selectedVehicle.make}
            onChangeText={(text) =>
              setSelectedVehicle({ ...selectedVehicle, make: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Model"
            placeholderTextColor="#ccc"
            value={selectedVehicle.model}
            onChangeText={(text) =>
              setSelectedVehicle({ ...selectedVehicle, model: text })
            }
          />
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
          </Text>
        </View>
      )}

      {/* Vehicle Image */}
      <Image
        source={
          selectedVehicle.image
            ? { uri: selectedVehicle.image }
            : require('./assets/car.png') // Fallback placeholder
        }
        style={styles.carImage}
      />

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {/* Miles */}
      <View style={styles.milesContainer}>
        <Text style={styles.label}>Miles:</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            placeholder="Miles"
            placeholderTextColor="#ccc"
            value={selectedVehicle.miles}
            keyboardType="numeric"
            onChangeText={(text) =>
              setSelectedVehicle({ ...selectedVehicle, miles: text })
            }
          />
        ) : (
          <Text style={styles.infoText}>{selectedVehicle.miles} miles</Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {editing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
          <Text style={styles.buttonText}>Add New Vehicle</Text>
        </TouchableOpacity>
      </View>

      {/* List of Vehicles */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.vehicleItem,
              item.id === selectedVehicle.id && styles.selectedVehicle,
            ]}
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
                source={
                  item.image
                    ? { uri: item.image }
                    : require('./assets/car.png')
                }
                style={styles.vehicleThumbnail}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2c2c34', // Dark gray background
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e33d6e', // Pink border for inputs
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#1c1c24', // Darker input background
    color: '#fff', // White text
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
  carImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#e33d6e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#e33d6e',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#097cfa',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#097cfa',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  milesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    color: '#fff',
  },
  vehicleItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#097cfa', // Blue border for list items
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#1c1c24', // Slightly lighter dark gray
    alignItems: 'center',
    width: 120,
  },
  selectedVehicle: {
    borderColor: '#e33d6e', // Pink border for selected vehicle
    backgroundColor: '#2c2c34',
  },
  vehicleContent: {
    alignItems: 'center',
  },
  vehicleText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff', // White text
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
