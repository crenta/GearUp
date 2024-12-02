import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from './MapPage';
import SearchPage from './SearchPage';
import MyCarPage from './MyCarPage';
import SettingsPage from './SettingsPage';  // Changed from SharePage
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>
              {focused ? '⬤' : '○'}
            </Text>
          ),
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Map"
          component={MapPage}
          options={{
            tabBarLabel: 'Map',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            tabBarLabel: 'Search',
          }}
        />
        <Tab.Screen
          name="My Cars"
          component={MyCarPage}
          options={{
            tabBarLabel: 'My Cars',
          }}
        />
        <Tab.Screen
          name="Settings"  // Changed from "Share"
          component={SettingsPage}  // Changed from SharePage
          options={{
            tabBarLabel: 'Settings',  // Changed from "Share"
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
