import React, { useState, useEffect } from 'react';
//expo install expo-image-picker
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import {
  Text, Button, Image, TouchableOpacity
} from 'react-native';
import firebase from '../config/firebase';

export default function Upload(props) {

  const [imagem, setImagem] = useState(null);

  useEffect(()=>{
    if(imagem){
      var user = firebase.auth().currentUser;
      user.updateProfile({
        photoURL:imagem 
      }).then(()=>{
        //console.log(user.photoURL)
      }).catch((error)=>{console.log(error)})
    }



},[imagem])

  uploadImagem = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = new Date().getTime();

    var ref = firebase.storage().ref().child('profilePic/' + filename);

    ref.put(blob).then(function (snapshot) {

      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setImagem(downloadURL)
      })
    })
  }

  escolherImagem = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        // setImagem(result.uri)
        uploadImagem(result.uri);

      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };



  return (

          // {imagem &&
          //   <Avatar source={{ uri: imagem }} style={{ width: 200, height: 200 }} />
          // }

          <TouchableOpacity style={styles.itemMenu} onPress={() => { escolherImagem() } }>
                  <Text style={styles.textMenu}>Change picture</Text>
          </TouchableOpacity>

  )

}
