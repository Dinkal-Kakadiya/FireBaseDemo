import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';

import auth from '@react-native-firebase/auth';

const Authentication = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return null;
  if (!user) {
    return (
      <SafeAreaView>
        <Header />

        <Text>Login</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Header />
      <Text>Welcome {user.email}</Text>
    </SafeAreaView>
  );
};

export default Authentication;

const styles = StyleSheet.create({});
