import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import ModelScreen from './src/screens/ModelScreen';
import PhotoUploadScreen from './src/components/PhotoUploadScreen';
import OutputScreen from './src/components/OutputScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        <Stack.Screen name="ModelScreen" component={ModelScreen} />
      <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
      <Stack.Screen name="OutputScreen" component={OutputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
