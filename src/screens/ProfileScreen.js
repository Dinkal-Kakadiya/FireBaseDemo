import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [capacity, setCapacity] = useState();
  const [userDetail, setUserDetail] = useState([]);

  console.log(userDetail, '******************');

  const usersCollection = firestore().collection('Users');

  const userData = () => {
    // console.log(userDetail);
    // setUserDetail(userDetail);

    const temp = {
      name: name,
      brand: brand,
      capacity: capacity,
    };

    setUserDetail([...userDetail, temp]);

    setTimeout(() => {
      firestore()
        .collection('_cars')
        .add(temp)
        .then(() => {
          console.log('car added...');
        })
        .catch(e => {
          console.log('_____-----------', e);
        });
    }, 500);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        placeholderTextColor={'black'}
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Brand"
        placeholderTextColor={'black'}
        value={brand}
        onChangeText={txt => {
          setBrand(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Capacity"
        placeholderTextColor={'black'}
        value={capacity}
        onChangeText={txt => {
          setCapacity(txt);
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          userData();
        }}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  addBtn: {
    backgroundColor: 'pink',
    marginHorizontal: 25,
    marginVertical: 25,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
});
