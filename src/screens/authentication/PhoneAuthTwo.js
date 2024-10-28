import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const PhoneAuthTwo = () => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  console.log('()()()(()()()(()()()()(', confirm);

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  if (!confirm) {
    return (
      //   <Button
      //     title="Phone Number Sign In"
      //     onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      //   />
      <SafeAreaView>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            signInWithPhoneNumber('+91 9998942131');
          }}>
          <Text>Phone Number Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <TextInput
        value={code}
        onChangeText={txt => {
          setCode(txt);
        }}
        style={styles.textInput}
        placeholder="Phone number"
      />
      <TouchableOpacity
        onPress={() => {
          confirmCode();
        }}>
        <Text>PhoneAuthTwo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PhoneAuthTwo;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: 'pink',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
