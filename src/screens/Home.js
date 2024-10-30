import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {onAuthStateChanged} from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={styles.btns}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GetData');
        }}
        style={styles.btns}>
        <Text>Get Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        style={styles.btns}>
        <Text>Email Authentication</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PhoneAuth');
        }}
        style={styles.btns}>
        <Text>Phone Authentication</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GoogleAuth');
        }}
        style={styles.btns}>
        <Text>Google Authentication</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PhoneAuthTwo');
        }}
        style={styles.btns}>
        <Text>Phone Authentication 2 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CloudStorage');
        }}
        style={styles.btns}>
        <Text>Cloud Storage </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileScreen');
        }}
        style={styles.btns}>
        <Text>Profile Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  btns: {
    backgroundColor: 'skyblue',
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
});
