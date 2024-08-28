import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './Login';
import DashboardScreen from './Dashboard';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    // <SafeAreaProvider>
      // <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      // </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default App;
