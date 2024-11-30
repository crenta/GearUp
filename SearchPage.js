import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchPage = () => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);

  // Sample data
  const data = {
    makes: ['Toyota', 'Ford', 'Honda'],
    models: {
      Toyota: ['Camry', 'Corolla', 'RAV4'],
      Ford: ['F-150', 'Escape', 'Explorer'],
      Honda: ['Civic', 'Accord', 'CR-V'],
    },
    categories: {
      Camry: ['Brakes', 'Suspension', 'Engine'],
      Corolla: ['Tires', 'Exhaust', 'Battery'],
      RAV4: ['Lights', 'Transmission', 'Filters'],
      'F-150': ['Suspension', 'Brakes', 'Engine'],
      Escape: ['Transmission', 'Lights', 'Battery'],
      Explorer: ['Filters', 'Tires', 'Exhaust'],
      Civic: ['Engine', 'Brakes', 'Lights'],
      Accord: ['Transmission', 'Exhaust', 'Filters'],
      'CR-V': ['Battery', 'Suspension', 'Brakes'],
    },
  };

  const handleSelect = (value) => {
    switch (currentPicker) {
      case 'make':
        setSelectedMake(value);
        setSelectedModel('');
        setSelectedCategory('');
        break;
      case 'model':
        setSelectedModel(value);
        setSelectedCategory('');
        break;
      case 'category':
        setSelectedCategory(value);
        break;
    }
    setModalVisible(false);
    setResults([]);
  };

  const showPicker = (pickerType) => {
    setCurrentPicker(pickerType);
    setModalVisible(true);
  };

  const getPickerData = () => {
    switch (currentPicker) {
      case 'make':
        return data.makes;
      case 'model':
        return selectedMake ? data.models[selectedMake] : [];
      case 'category':
        return selectedModel ? data.categories[selectedModel] : [];
      default:
        return [];
    }
  };

  const handleSearch = () => {
    if (selectedMake && selectedModel && selectedCategory) {
      setResults([
        `${selectedMake} ${selectedModel} - ${selectedCategory} Part 1`,
        `${selectedMake} ${selectedModel} - ${selectedCategory} Part 2`,
        `${selectedMake} ${selectedModel} - ${selectedCategory} Part 3`,
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => showPicker('make')}
        >
          <Text style={styles.selectButtonText}>
            {selectedMake || 'Select Make'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectButton, !selectedMake && styles.disabled]}
          onPress={() => selectedMake && showPicker('model')}
        >
          <Text style={styles.selectButtonText}>
            {selectedModel || 'Select Model'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectButton, !selectedModel && styles.disabled]}
          onPress={() => selectedModel && showPicker('category')}
        >
          <Text style={styles.selectButtonText}>
            {selectedCategory || 'Select Category'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.searchButton, (!selectedMake || !selectedModel || !selectedCategory) && styles.disabled]}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>{item}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noResults}>No results found. Start a search!</Text>
          }
        />

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {getPickerData().map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c34',
  },
  content: {
    padding: 16,
  },
  selectButton: {
    backgroundColor: '#1c1c24',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e33d6e',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#097cfa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#1c1c24',
    borderWidth: 1,
    borderColor: '#e33d6e',
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#2c2c34',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c24',
  },
  modalItemText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#e33d6e',
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default SearchPage;
