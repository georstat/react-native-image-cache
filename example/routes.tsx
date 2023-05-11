import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from './src/App';
import PrefetchImage from './src/PrefetchImage';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="App">
          <Stack.Screen
            name="App"
            component={App}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PrefetchImage" component={PrefetchImage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default Routes;
