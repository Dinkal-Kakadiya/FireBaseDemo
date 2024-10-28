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
import Header from '../../components/Header';

const SignUp = ({navigation}) => {
  const [register, setRegister] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)

      .then(res => {
        Alert.alert('User Added...');
        console.log(res);
        setRegister(false);
      })
      .catch(e => {
        Alert.alert('Found Some Error to sign up !!!...');

        console.log(e);
      });
  };

  const onSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        Alert.alert('Success fully loged in...');
        console.log(res);
        navigation.navigate('LogOutScreen');
      })
      .catch(e => {
        Alert.alert('Found Some to log in Error !!!...');

        console.log(e);
      });
  };

  return (
    <SafeAreaView>
      <Header />
      {register ? (
        <Text style={styles.screenHeader}>Sign Up Screen</Text>
      ) : (
        <Text style={styles.screenHeader}>Sign In Screen</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholderTextColor={'black'}
        placeholder="Email"
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
      />
      <TextInput
        placeholderTextColor={'black'}
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
      />
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => {
          {
            register ? onRegister() : onSignIn();
          }
        }}>
        <Text>Register</Text>
      </TouchableOpacity>
      {register ? (
        <Text style={styles.normalTxt}>
          All ready have an Account ?{' '}
          <Text
            style={styles.loginBtnTxt}
            onPress={() => setRegister(!register)}>
            Login
          </Text>
        </Text>
      ) : (
        <Text style={styles.normalTxt}>
          Don't have an account ?{' '}
          <Text
            style={styles.loginBtnTxt}
            onPress={() => setRegister(!register)}>
            Register
          </Text>
        </Text>
      )}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  screenHeader: {
    color: 'black',
    fontSize: 20,
    marginVertical: 20,
    fontWeight: '700',
    alignSelf: 'center',
  },
  textInput: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  registerBtn: {
    backgroundColor: 'orange',
    marginHorizontal: 20,
    marginVertical: 40,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  normalTxt: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    marginVertical: 15,
  },
  loginBtnTxt: {
    color: 'red',
  },
});
