import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SearchPage = () => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState([]);

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

  const handleSearch = () => {
    // Filter logic: Simulating results based on selections
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
    <View style={styles.container}>
      {/* Dropdown for Vehicle Make */}
      <Picker
        selectedValue={selectedMake}
        onValueChange={(itemValue) => {
          setSelectedMake(itemValue);
          setSelectedModel('');
          setSelectedCategory('');
          setResults([]);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select Make" value="" />
        {data.makes.map((make) => (
          <Picker.Item key={make} label={make} value={make} />
        ))}
      </Picker>

      {/* Dropdown for Vehicle Model */}
      <Picker
        selectedValue={selectedModel}
        onValueChange={(itemValue) => {
          setSelectedModel(itemValue);
          setSelectedCategory('');
          setResults([]);
        }}
        style={styles.picker}
        enabled={!!selectedMake}
      >
        <Picker.Item label="Select Model" value="" />
        {selectedMake &&
          data.models[selectedMake].map((model) => (
            <Picker.Item key={model} label={model} value={model} />
          ))}
      </Picker>

      {/* Dropdown for Part Category */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => {
          setSelectedCategory(itemValue);
          setResults([]);
        }}
        style={styles.picker}
        enabled={!!selectedModel}
      >
        <Picker.Item label="Select Category" value="" />
        {selectedModel &&
          data.categories[selectedModel].map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
      </Picker>

      {/* Search Button */}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* Search Results */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          !results.length && (
            <Text style={styles.noResults}>No results found. Start a search!</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2c2c34', // Dark background for the app
  },
  picker: {
    borderWidth: 1,
    borderColor: '#e33d6e', // Pink border for dropdowns
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#1c1c24', // Slightly lighter dark background for dropdowns
    color: '#fff', // White text for dropdown
  },
  button: {
    backgroundColor: '#097cfa', // Blue for the search button
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e33d6e', // Pink underline for results
    backgroundColor: '#1c1c24', // Slightly lighter dark background for results
  },
  resultText: {
    fontSize: 16,
    color: '#fff', // White text for results
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ccc', // Light gray for empty state text
    marginTop: 20,
  },
});

export default SearchPage;
