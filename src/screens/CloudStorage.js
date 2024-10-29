import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import storage from '@react-native-firebase/storage';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-crop-picker';

const CloudStorage = () => {
  const [image, setImage] = useState(null);
  const [yourImage, setYourImage] = useState(null);

  const selectPhoto = () => {
    ImagePicker.openPicker({
      height: 200,
      width: 200,
      cropping: true,
    })
      .then(res => {
        console.log('---------->>>>>>>>>>', res?.path);
        setImage(res?.path);
      })
      .catch(e => {
        console.log('=================>>>>>>>>>>>>>', e);
      });
  };

  // const saveImage = async () => {
  //   const uploadUrl = image;
  //   let fileName = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1);
  //   try {
  //     await storage()
  //       .ref()
  //       .child('images/' + fileName)
  //       .putFile(uploadUrl)
  //       .then(snapshot => {
  //         getImage(fileName);
  //       });
  //   } catch (err) {
  //     console.log('errrrrrrr=======', err);
  //   }
  // };

  // const getImage = async fileName => {
  //   await storage()
  //     .ref('images/' + fileName)
  //     .getDownloadURL()
  //     .then(async res => {
  //       setYourImage(res);
  //     })
  //     .catch(err => {
  //       console.log('error in download', err);
  //     });
  // };

  const saveImage = () => {
    const reference = storage().ref(image);
    const pathToFile = image;

    reference
      .putFile(pathToFile)
      .then(ref => {
        console.log('==========>>>>>', ref);
        console.log('Save Image');
        getImage();
      })
      .catch(e => {
        console.log('-------->>>>>>>>', e);
      });
  };

  const getImage = () => {
    storage()
      .ref(image)
      .getDownloadURL()
      .then(res => {
        console.log('{}{}{}{}{}{{}{}{}{}{}', res);
        setYourImage(res);
      })
      .catch(e => {
        console.log('_*_*_*_*_*_*', e);
      });
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          selectPhoto();
        }}>
        {image === null ? (
          <Text>Image</Text>
        ) : (
          <Image source={{uri: image}} style={styles.img} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          saveImage();
        }}>
        <Text>Add</Text>
      </TouchableOpacity>
      {yourImage !== null ? (
        <Image source={{uri: yourImage}} style={styles.yourImageContainer} />
      ) : (
        <View style={styles.yourImageContainer}>
          <Text>Your Image</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CloudStorage;

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    marginVertical: 50,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  imgContainer: {
    height: 120,
    width: 120,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 15,
  },
  flatListContainer: {
    borderWidth: 1,
  },
  yourImageContainer: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// From last two working day's i tried to do phone Auth and Google auth in which yesterday i did complete phone auth but i can't complete Google auth so after that i start learning firebase Storage so today in morning i did save image in firebase storage and get that URL from firebase and show image
