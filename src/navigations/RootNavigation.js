import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from '../screens/Home';
import Authentication from '../screens/Authentication';
import GetData from '../screens/GetData';
import SignUp from '../screens/authentication/SignUp';
import PhoneAuth from '../screens/authentication/PhoneAuth';
import LogOutScreen from '../screens/LogOutScreen';
import GoogleAuth from '../screens/authentication/GoogleAuth';
import PhoneAuthTwo from '../screens/authentication/PhoneAuthTwo';
import CloudStorage from '../screens/CloudStorage';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GetData" component={GetData} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
        <Stack.Screen name="LogOutScreen" component={LogOutScreen} />
        <Stack.Screen name="GoogleAuth" component={GoogleAuth} />
        <Stack.Screen name="PhoneAuthTwo" component={PhoneAuthTwo} />
        <Stack.Screen name="CloudStorage" component={CloudStorage} />
        {/* <Stack.Screen name="Authentication" component={Authentication} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
