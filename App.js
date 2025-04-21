import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapPage from './MapPage';
import SearchPage from './SearchPage';
import MyCarPage from './MyCarPage';
import SettingsPage from './SettingsPage';
import { Text } from 'react-native';

// bottom tab navigator
const Tab = createBottomTabNavigator();

// Main App
export default function App() {
  return (
    // NavigationContainer
    <NavigationContainer>
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>
              {focused ? '⬤' : '○'}
            </Text>
          ),
          // Color configuration
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          
          headerStyle: {
            backgroundColor: '#2c2c34',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
          tabBarStyle: {
            backgroundColor: '#2c2c34',
            borderTopColor: '#1c1c24',
          }
        })}
      >
        {/* each tab screen */}
        <Tab.Screen
          name="Map"
          component={MapPage}
          options={{
            tabBarLabel: 'Map',
          }}
        />
        
        {/* Search tab */}
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            tabBarLabel: 'Search',
          }}
        />
        
        {/* My Cars tab */}
        <Tab.Screen
          name="My Cars"
          component={MyCarPage}
          options={{
            tabBarLabel: 'My Cars',
          }}
        />
        
        {/* Settings tab */}
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
