import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Profile = props => {
  const navigation = useNavigation();
  const userDetails = props.route.params.userDetail;
  console.log(userDetails, '-=-=-=-=-=-=-=-=-=-=-');
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: userDetails.profileImage}}
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.headingTxt}>Name : </Text>
        <Text style={styles.normalTxt}>{userDetails.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headingTxt}>Age : </Text>
        <Text style={styles.normalTxt}>{userDetails.age}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headingTxt}>Phone no. : </Text>
        <Text style={styles.normalTxt}>{userDetails.phone}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headingTxt}>Email : </Text>
        <Text style={styles.normalTxt}>{userDetails.email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!');
              navigation.navigate('Login');
            });
        }}
        style={styles.logoutBtn}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'space-evenly',
    marginHorizontal: 30,
    marginVertical: 15,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 20,
    shadowRadius: 10,
    shadowOffset: {width: -2, height: 4},
  },
  headingTxt: {
    color: 'black',
    fontSize: 18,
  },
  normalTxt: {
    // color: 'black',
    fontSize: 18,
  },
  logoutBtn: {
    shadowColor: 'red',
    elevation: 10,

    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 120,
    marginVertical: 30,
    paddingVertical: 15,
  },
});
