import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './Login';
import DashboardScreen from './Dashboard';
import Notifications from './Notifications';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const App: React.FC = () => {
  return (
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Notifications" component={Notifications} />

        </Drawer.Navigator>
  );
};

export default App;
