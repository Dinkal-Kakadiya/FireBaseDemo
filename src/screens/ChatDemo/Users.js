import {
  FlatList,
  Image,
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
import Modal from 'react-native-modal';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

const Users = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [userImageModal, setUserImageModal] = useState(false);

  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(res => {
        setUser(res?._docs);
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatScreen', {userDetail: item?._data});
              }}
              style={styles.flatListItem}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentUserImage(item?._data);
                  setUserImageModal(true);
                }}
                style={styles.userImageContainer}>
                <Image
                  source={{uri: item?._data?.profileImage}}
                  style={styles.userImage}
                />
              </TouchableOpacity>
              <Modal
                onBackdropPress={() => {
                  setUserImageModal(false);
                }}
                isVisible={userImageModal}
                backdropColor="#00000055"
                style={styles.modalContainer}>
                <Image
                  source={{uri: currentUserImage?.profileImage}}
                  style={styles.userModalImage}
                />
                <Text style={styles.modalText}>{currentUserImage?.name}</Text>
              </Modal>
              <View>
                <Text>{item?._data?.name}</Text>
                <Text>{item?._data?.age}</Text>
                <Text>{item?._data?.email}</Text>
                <Text>{item?._data?.phone}</Text>
              </View>
            </TouchableOpacity>
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
  flatListContainer: {},
  flatListItem: {
    flexDirection: 'row',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 5,
    borderRadius: 15,
  },
  userImageContainer: {
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  modalContainer: {
    marginHorizontal: 50,
    marginVertical: 50,
  },
  userModalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  modalText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '500',
  },
});
