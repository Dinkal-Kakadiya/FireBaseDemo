import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ConstImage from '../../assets';

const ChatScreen = props => {
  const [message, setMessage] = useState();

  const {userDetail} = props?.route?.params;
  console.log('{_{_{_{__{_{_{__{', userDetail);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Image
            source={{uri: userDetail?.profileImage}}
            style={styles.userImage}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>{userDetail?.name}</Text>
        </View>
      </View>
      <View></View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.textInputContainer}
          value={message}
          onChangeText={txt => {
            setMessage(txt);
          }}
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Image source={ConstImage.sendBtn} style={styles.sendBtnImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection: 'row',
    backgroundColor: '#22dd22',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  bottomContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 7,
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 50,
    width: 300,
    paddingHorizontal: 15,
  },
  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  sendBtnImage: {
    height: 30,
    width: 30,
  },
});
