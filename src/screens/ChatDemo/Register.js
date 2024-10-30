import {
  Alert,
  Image,
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
import {
  deleteAllPersistentCacheIndexes,
  doc,
} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validation = () => {
    if (
      email !== '' &&
      password !== '' &&
      name !== '' &&
      age !== '' &&
      phone !== '' &&
      image !== null
    ) {
      if (name.length > 1) {
        if (0 < parseInt(age) && parseInt(age) < 150) {
          if (phone.length === 10) {
            if (emailRegex.test(email) === true) {
              if (passwordRegex.test(password) === true) {
                console.log('valide.........');
                firebaseSignUp(email, password);
              } else {
                console.log('password is not valid....');
              }
            } else {
              console.log('email is not valid....');
            }
          } else {
            console.log('Phone number is not valid...!!');
          }
        } else {
          console.log('Age is not valid...!!');
        }
      } else {
        console.log('Name is not valid...!!');
      }
    } else {
      console.log("All field's are required");
    }
  };

  const firebaseSignUp = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        saveImage();
        console.log('User account created & signed in!');

        setName('');
        setAge('');
        setPhone('');
        setEmail('');
        setPhone('');
        Alert.alert('Success', 'User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Error', 'That email address is invalid!');
        } else {
          console.log(error.code);
          Alert.alert('Error', error.code);
        }
      });
  };

  const selectImage = () => {
    ImageCropPicker.openPicker({
      height: 300,
      width: 300,
      cropping: true,
    })
      .then(res => {
        setImage(res?.path);
      })
      .catch(e => {
        console.log('---------->>>>>>>', e);
      });
  };
  const saveImage = () => {
    const reference = storage().ref(image);
    const pathToFile = image;

    reference
      .putFile(pathToFile)
      .then(ref => {
        // console.log('==========>>>>>', ref);
        console.log('Save Image');
        getImage();
      })
      .catch(e => {
        console.log('-------->>>>>>>>--------', e);
      });
  };
  const getImage = () => {
    storage()
      .ref(image)
      .getDownloadURL()
      .then(res => {
        // console.log('{-}{-}{-}{-}{-}{-}{-}{-}{-}{-}', res);
        setImageURL(res);
        firestore().collection('Users').doc(auth().currentUser.uid).set({
          name: name,
          age: age,
          phone: phone,
          email: email,
          profileImage: res,
          userId: auth().currentUser.uid,
        });
      })
      .then(() => {
        navigation.navigate('Users');
      })
      .catch(e => {
        console.log('_*_*_*_*_*_*', e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        placeholderTextColor={'black'}
        onChangeText={txt => {
          setName(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Age"
        keyboardType="number-pad"
        maxLength={100}
        placeholderTextColor={'black'}
        onChangeText={txt => {
          setAge(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Phone"
        keyboardType="number-pad"
        maxLength={10}
        placeholderTextColor={'black'}
        onChangeText={txt => {
          setPhone(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={'black'}
        onChangeText={txt => {
          setEmail(txt);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={'black'}
        onChangeText={txt => {
          setPassword(txt);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          selectImage();
        }}
        style={styles.imageContainer}>
        {image === null ? (
          <Text style={styles.imageTxt}>Image</Text>
        ) : (
          <Image source={{uri: image}} style={styles.img} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          validation();
        }}
        style={styles.logInBtn}>
        <Text>Register</Text>
      </TouchableOpacity>
      <Text style={styles.normalText}>
        All ready have an account ?
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.registerBtnTxt}>
          {' '}
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Register;

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
  imageContainer: {
    width: 150,
    height: 135,
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 15,
  },
  img: {
    height: 135,
    width: 150,
    borderRadius: 15,
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
