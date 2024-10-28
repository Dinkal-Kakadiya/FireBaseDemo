import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.conatainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  conatainer: {
    backgroundColor: 'yellow',
  },
  backText: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
