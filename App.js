// Import required dependencies from React and React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import individual page components
import MapPage from './MapPage';
import SearchPage from './SearchPage';
import MyCarPage from './MyCarPage';
import SettingsPage from './SettingsPage';
import { Text } from 'react-native';

// Create a bottom tab navigator instance
const Tab = createBottomTabNavigator();

// Main App component that sets up the navigation structure
export default function App() {
  return (
    // NavigationContainer
    <NavigationContainer>
      {/* Tab.Navigator configures the bottom tab bar */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Custom tab bar icon - uses filled circle for active tab and empty circle for inactive
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>
              {focused ? '⬤' : '○'}
            </Text>
          ),
          // Color configuration for active and inactive tabs
          tabBarActiveTintColor: '#007AFF',    // iOS blue color for active tab
          tabBarInactiveTintColor: 'gray',     // Gray color for inactive tabs
          
          // Dark theme styling for the header
          headerStyle: {
            backgroundColor: '#2c2c34',        // Dark background for header
          },
          headerTintColor: '#fff',             // White text color for header
          headerTitleStyle: {
            fontWeight: 'bold',                // Bold header title
          },
          // Dark theme styling for the tab bar
          tabBarStyle: {
            backgroundColor: '#2c2c34',        // Dark background for tab bar
            borderTopColor: '#1c1c24',         // Darker border color for tab bar top
          }
        })}
      >
        {/* Define each tab screen with its component and label */}
        <Tab.Screen
          name="Map"                           // Navigation identifier for the Map screen
          component={MapPage}                  // Component to render for Map tab
          options={{
            tabBarLabel: 'Map',               // Label shown in the tab bar
          }}
        />
        
        {/* Search tab configuration */}
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            tabBarLabel: 'Search',
          }}
        />
        
        {/* My Cars tab configuration */}
        <Tab.Screen
          name="My Cars"
          component={MyCarPage}
          options={{
            tabBarLabel: 'My Cars',
          }}
        />
        
        {/* Settings tab configuration */}
        <Tab.Screen
          name="Settings"  
          component={SettingsPage}  
          options={{
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
