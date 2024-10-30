import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();

  const {userName} = props;
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userName)
      .get()
      .then(res => {
        setUserDetail(res?._data);
      });
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.userNameTxt}>Welcome {userDetail?.name}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', {userDetail: userDetail});
        }}
        style={styles.imageContainer}>
        <Image
          source={{uri: userDetail?.profileImage}}
          style={styles.userImg}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  userImg: {
    // borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  userNameTxt: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
  },
  imageContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
