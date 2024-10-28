// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Header from '../../components/Header';
// import auth from '@react-native-firebase/auth';

// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// const GoogleAuth = ({navigation}) => {
//   const [userInfo, setUserInfo] = useState(null);

//   console.log('=--=-=-=-=-=--=-=-=-=-=-=-', userInfo);

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '608272447179-bmashkv00k2vquko1qg2j2qfuffohqpp.apps.googleusercontent.com',
//     });
//   }, []);

//   // const googleAuthentication = async () => {
//   //   // console.log('Hello Google');
//   //   try {
//   //     // await GoogleSignin.hasPlayServices();
//   //     // const userDetail = await GoogleSignin.signIn();
//   //     // setUserInfo(userDetail);
//   //     // navigation.navigate('LogOutScreen');
//   //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   //     const {idToken} = await GoogleSignin.signIn();
//   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   //     return auth()
//   //       .signInWithCredential(googleCredential)
//   //       .then(res => {
//   //         console.log('res', res);
//   //       });
//   //   } catch (err) {
//   //     console.log('<<<--->>>', err);
//   //   }
//   // };

//   const onPressGoogle = async () => {
//     // try {
//     await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog: true,
//     }).then(res => {
//       console.log('==================', res);
//     });
//     // setSocialLoading(true);
//     GoogleSignin.signIn()
//       .then(res => {
//         console.log('--------------------', res);
//       })
//       .catch(err => {
//         console.log('====------', err);
//       });
//     // const idToken = userInfo?.data?.idToken || null;
//     // if (idToken) {
//     //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     //   auth()
//     //     .signInWithCredential(googleCredential)
//     //     .then(async user => {
//     //       console.log('logged in successfully', user);
//     //       const idToken = await user.user.getIdToken();
//     //       console.log('idToken', idToken);
//     //       // socialCallVerify(idToken);
//     //     })
//     //     .catch(e => {
//     //       console.log('error in login', e);
//     //     });
//     // } else {
//     //   // setSocialLoading(false);
//     //   console.log(userInfo?.type || '');
//     // }
//     // } catch (error) {
//     //   // setSocialLoading(false);
//     //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//     //     console.log(error);
//     //   } else if (error.code === statusCodes.IN_PROGRESS) {
//     //     console.log(error);
//     //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//     //     console.log(error);
//     //   } else {
//     //     console.log('err', error);
//     //   }
//     // }
//   };

//   return (
//     <SafeAreaView>
//       <Header />

//       {userInfo === null ? (
//         <View>
//           <Text>GoogleAuth</Text>
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               onPressGoogle();
//             }}>
//             <Text>Google Authentication</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View>
//           <Text>Sign Out</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default GoogleAuth;

// const styles = StyleSheet.create({
//   btn: {
//     backgroundColor: 'orange',
//     marginHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 20,
//     borderRadius: 15,
//     alignItems: 'center',
//   },
// });

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Header from '../../components/Header';

const GoogleAuth = () => {
  const [userInfo, setUserInfo] = useState(null);

  GoogleSignin.configure({
    webClientId:
      '608272447179-i2h49doh36jjr6b37sm8sp9a7jdbhhvg.apps.googleusercontent.com',
    iosClientId:
      '608272447179-bmashkv00k2vquko1qg2j2qfuffohqpp.apps.googleusercontent.com',
  });

  const signIn = async () => {
    console.log('SignIn');
    GoogleSignin.hasPlayServices()
      .then(async res => {
        // console.log('+++++++++++++++>>>>>>,', await GoogleSignin.signIn());
        // setUserInfo(GoogleSignin.signIn());
        console.log('=========', res);
        GoogleSignin.signIn()
          .then(res => {
            console.log('========----------', res);
          })
          .catch(err => {
            console.log('============------------------------', err);
          });
      })
      .catch(err => {
        console.log('---------', err);
      });
  };

  const signOut = () => {
    console.log('{}{}{}{}{}{}{}{}{}{{', userInfo);
    // console.log()
  };

  return (
    <SafeAreaView>
      <Header />
      {userInfo === null ? (
        <TouchableOpacity
          style={styles.signinBtn}
          onPress={() => {
            signIn();
          }}>
          <Text>SignIn</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.signinBtn}
          onPress={() => {
            signOut();
          }}>
          <Text>SignOut</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default GoogleAuth;

const styles = StyleSheet.create({
  signinBtn: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
});
