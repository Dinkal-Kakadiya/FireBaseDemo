import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../../components/chatDemo/Header';

const Users = () => {
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    console.log('_*_*_*_*_**_', auth()?.currentUser?.uid);

    firestore()
      .collection('Users')
      .get()
      .then(res => {
        setUser(res?._docs);
        console.log(res?._docs);
      })
      .catch(e => {
        console.log('----------', e);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header userName={auth()?.currentUser?.uid} />
      <FlatList
        style={styles.flatListContainer}
        horizontal={false}
        data={user}
        renderItem={({item}) => {
          if (auth().currentUser.uid === item?._data?.userId) {
            return;
          }
          return (
            <View style={styles.flatListItem}>
              <Text>{item?._data?.age}</Text>
              <Text>{item?._data?.name}</Text>
              <Text>{item?._data?.email}</Text>
              <Text>{item?._data?.phone}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  getDataBtn: {
    marginHorizontal: 20,
    backgroundColor: 'pink',
    marginVertical: 50,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  flatListContainer: {
    // flex: 1,
    // backgroundColor: 'yellow',
  },
  flatListItem: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    // borderColor: 'black',
  },
});
