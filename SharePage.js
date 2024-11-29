import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuid } from 'uuid'; // For generating unique IDs

const SharePage = () => {
  const [posts, setPosts] = useState([]); // Array of shared messages and images
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  // Handle Image Upload
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
          setImage(selectedImage);
        }
      }
    );
  };

  // Handle Post Submission
  const handlePost = () => {
    if (message.trim() || image) {
      const newPost = {
        id: uuid(), // Unique ID for the post
        message,
        image,
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the top of the list
      setMessage(''); // Clear the message input
      setImage(null); // Clear the image
    }
  };

  return (
    <View style={styles.container}>
      {/* Message Input */}
      <TextInput
        style={styles.input}
        placeholder="Write a message..."
        placeholderTextColor="#ccc"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      {/* Upload Image Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
        <Text style={styles.buttonText}>{image ? 'Change Image' : 'Upload Image'}</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

      {/* Shared Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
            {item.message && <Text style={styles.postText}>{item.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2c2c34', // Dark gray background for the app
  },
  input: {
    borderWidth: 1,
    borderColor: '#e33d6e', // Pink border for the input
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#1c1c24', // Slightly lighter dark gray for the input background
    color: '#fff', // White text
  },
  uploadButton: {
    backgroundColor: '#e33d6e', // Pink for the upload button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  postButton: {
    backgroundColor: '#097cfa', // Blue for the post button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
  postItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e33d6e', // Pink border for posts
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#1c1c24', // Slightly lighter dark gray for post backgrounds
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    color: '#fff', // White text for post messages
  },
});

export default SharePage;
