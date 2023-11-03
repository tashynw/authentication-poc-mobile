/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {config} from '@gluestack-ui/config';
import {Box, GluestackUIProvider, ScrollView} from '@gluestack-ui/themed';
import React, {useContext} from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import HomePage from './pages/Home';
import BottomNavigationBar from './components/BottomNavigationBar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/Login';
import AuthProvider from './context/AuthProvider';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      {/* <BottomNavigationBar /> */}
    </GluestackUIProvider>
  );
}

export default App;
