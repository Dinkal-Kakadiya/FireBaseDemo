import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import ConstImage from '../assets';

const Header = props => {
  const {image} = props;

  const navigation = useNavigation();

  return (
    <View style={styles.conatainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        {image ? (
          <Image source={ConstImage.backArrow} style={styles.backArrowImg} />
        ) : (
          <Text style={styles.backText}>Back</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  conatainer: {
    paddingTop: 10,
  },
  backArrowImg: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    marginHorizontal: 15,
  },
  backText: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
