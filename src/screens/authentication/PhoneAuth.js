// import {
//   Alert,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Header from '../../components/Header';
// import auth from '@react-native-firebase/auth';

// const PhoneAuth = () => {
//   const [phone, setPhone] = useState();
//   const [OTP, setOTP] = useState();

//   const [confirm, setConfirm] = useState(null);
//   console.log(typeof confirm, '<<<<<<<<<', confirm);

//   const phoneRegister = async value => {
//     console.log(typeof value, '<<<<<<<<<', value);
//     // auth()
//     //   .signInWithPhoneNumber('+91 ' + value)
//     //   .then(res => {
//     //     console.log('=========', res);
//     //   })
//     //   .catch(e => {
//     //     console.log('----------', e);
//     //   });

//     const conformation = await auth().signInWithPhoneNumber('+91 ' + value);
//     setConfirm(conformation);
//   };

//   // const confirmOTP = async confirm => {
//   //   try {
//   //     await confirm.confirm(OTP);
//   //     console.log('<<<<<<<<<===========>>>>>>');
//   //   } catch (err) {
//   //     console.log('<<<<<<<<<------->>>>>>', err);
//   //   }
//   // };

//   // useEffect(() => {});

//   return (
//     <SafeAreaView>
//       <Header />

//       {confirm ? (
//         <TextInput
//           style={styles.textInput}
//           placeholder="OTP"
//           placeholderTextColor={'black'}
//           keyboardType="number-pad"
//           value={OTP}
//           maxLength={6}
//           onChangeText={txt => {
//             setOTP(txt);
//           }}
//         />
//       ) : (
//         <TextInput
//           style={styles.textInput}
//           placeholder="Phone Number"
//           placeholderTextColor={'black'}
//           keyboardType="number-pad"
//           value={phone}
//           maxLength={10}
//           onChangeText={txt => {
//             setPhone(txt);
//           }}
//         />
//       )}
//       <TouchableOpacity
//         style={styles.saveBtn}
//         onPress={() => {
//           {
//             confirm ? confirmOTP(confirm) : phoneRegister(phone);
//           }
//           //   console.log(phone, typeof phone);
//         }}>
//         <Text>{confirm ? 'Confirm' : 'Save'}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default PhoneAuth;

// const styles = StyleSheet.create({
//   textInput: {
//     borderWidth: 1,
//     marginHorizontal: 20,
//     marginVertical: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 15,
//   },
//   saveBtn: {
//     backgroundColor: 'orange',
//     marginHorizontal: 20,
//     marginVertical: 50,
//     paddingVertical: 10,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
// });

// // import React, {useState, useEffect} from 'react';
// // import {Button, SafeAreaView, TextInput} from 'react-native';
// // import auth from '@react-native-firebase/auth';

// // function PhoneAuth() {
// //   // If null, no SMS has been sent
// //   const [confirm, setConfirm] = useState(null);

// //   // verification code (OTP - One-Time-Passcode)
// //   const [code, setCode] = useState('');

// //   // Handle login
// //   function onAuthStateChanged(user) {
// //     if (user) {
// //       // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
// //       // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
// //       // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
// //       // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
// //     }
// //   }

// //   useEffect(() => {
// //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
// //     return subscriber; // unsubscribe on unmount
// //   }, []);

// //   // Handle the button press
// //   async function signInWithPhoneNumber(phoneNumber) {
// //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
// //     console.log('=======================', confirmation);

// //     setConfirm(confirmation);
// //   }

// //   async function confirmCode() {
// //     try {
// //       const res = await confirm.confirm(code);
// //       console.log('----------------', res);
// //     } catch (error) {
// //       console.log('Invalid code.');
// //     }
// //   }

// //   if (!confirm) {
// //     return (
// //       <SafeAreaView>
// //         <Button
// //           title="Phone Number Sign In"
// //           onPress={() =>
// //             signInWithPhoneNumber('+91 8866321731')
// //               .then(res => {
// //                 console.log('res', res);
// //               })
// //               .catch(err => {
// //                 console.log('err', err);
// //               })
// //           }
// //         />
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView>
// //       <TextInput value={code} onChangeText={text => setCode(text)} />
// //       <Button title="Confirm Code" onPress={() => confirmCode()} />
// //     </SafeAreaView>
// //   );
// // }

// // export default PhoneAuth;

import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function PhoneAuth() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(res => {
        console.log('=-=-=-', res);
        setConfirm(res);
      })
      .catch(err => {
        console.log('=-=-=-=-=->>>>>>>>>>>>>>', err);
      });
  }

  async function confirmCode() {
    try {
      const aa = await confirm.confirm(code);
      console.log('=============', aa);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <SafeAreaView>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+911111111111')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </SafeAreaView>
  );
}
