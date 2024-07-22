import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ModelScreen from '../screens/ModelScreen';
import PhotoUploadScreen from '../components/PhotoUploadScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OutputScreen from '../components/OutputScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ModelStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ModelScreen" component={ModelScreen} />
      <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
      <Stack.Screen name="OutputScreen" component={OutputScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#F4A443',
        tabBarInactiveTintColor: '#A1A1A1',
        tabBarStyle: {
          position: 'static',
          bottom: 25,
          left: 60,
          right: 20,
          elevation: 8,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          height: 70,
          width: '70%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Models"
        component={ModelStack}
        options={{
          tabBarLabel: 'Models',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cube-outline" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
