import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  console.log(auth()?.currentUser?.uid, '[-][-]-[]-[]-[]-[]-[]-[]');
  const validation = () => {
    if (email && password) {
      if (emailRegex.test(email) === true) {
        if (passwordRegex.test(password) === true) {
          console.log('valide.........');
          firebaseLogin(email, password);
        } else {
          console.log('password is not valid....');
        }
      } else {
        console.log('email is not valid....');
      }
    } else {
      console.log("Both field's are required");
    }
  };

  const firebaseLogin = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('Users')
          .doc('ABC')
          .get()
          .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
            }
          });
        navigation.replace('Users');
        Alert.alert('Success', 'User Successfully LogedIn');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          console.log('User not found !!!...');
          Alert.alert('Error', 'User not found ...!!!');
        } else {
          console.log(error.code);
        }
        console.log(error.code);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={'black'}
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={'black'}
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          validation();
        }}
        style={styles.logInBtn}>
        <Text>LogIn</Text>
      </TouchableOpacity>
      <Text style={styles.normalText}>
        Don't have an account ?
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={styles.registerBtnTxt}>
          {' '}
          Register
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  logInBtn: {
    backgroundColor: 'orange',
    marginHorizontal: 50,
    marginVertical: 50,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  normalText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
  },
  registerBtn: {
    backgroundColor: 'yellow',
    justifyContent: 'flex-end',
  },
  registerBtnTxt: {
    fontSize: 20,
    color: 'red',
  },
});
