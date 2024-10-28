import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';

const GetData = () => {
  const [userCollections, setUserCollections] = useState();
  const getUserData = async () => {
    try {
      const temp = await firestore()
        .collection('_users')
        .doc('1gDdxlU1RlT6ASp5BIUh')
        .get();
      setUserCollections(temp);
      console.log('___________________', temp._data);
    } catch (e) {
      console.log('===================', e);
    }
  };

  return (
    <SafeAreaView>
      <Header />
      <Text>GetData</Text>
      <TouchableOpacity
        onPress={() => {
          getUserData();
        }}>
        <Text>Get User Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GetData;

const styles = StyleSheet.create({});
