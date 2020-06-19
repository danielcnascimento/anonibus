import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, Text, Image, ScrollView,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Group
} from 'react-native';
import firebase from '../config/firebase';
import api from '../services/axios';
import axios from 'axios';
import Footer from './footer';

import styles from './styles';

import logoIconWhite from '../assets/img/logoIconWhite.png'
import btnArrowLeft from '../assets/img/btnArrowLeft.png'
import Room from '../Room';
import { set } from 'react-native-reanimated';

export default function Chat(props) {

  const {route} = props
  const {group, room_name} = route.params

  var userProfile = firebase.auth().currentUser;

  const [user, setUser] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [caixaTexto, setCaixaTexto] = useState('')
  const [scrollview, setScrollview] = useState('')
  const [savePicture, setSavePicture] = useState('')
  const [closeModal, setCloseModal] = useState(false)


  const db = firebase.firestore()

  const salvar = () => {
    api.post('/sendMessage', {
      mensagem: caixaTexto,
      user: user.name,
      profilePic: user.picture,
      imagem: savePicture,
      group:group
    })
      .then(function () {
        // setMensagens([...mensagens, caixaTexto])
        setCaixaTexto('')
        scrollview.scrollToEnd({ animated: true })
        
      }).catch(function () {

      })
        setCloseModal(false)
        setCaixaTexto("")
        setSavePicture(null)
  }

  useEffect(() => {
    carregaUsuarioAnonimo()
    let mensagens_enviadas = []
    const unsubscribe = db.collection("chat")
      .doc(group).collection('mensagem')
      .onSnapshot({ includeMetadataChanges: false }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            const { mensagem, user, profilePic, imagem } = change.doc.data()
            const id = change.doc.id
            mensagens_enviadas.push({ mensagem, user, profilePic, imagem, id })
          }
        })
        setMensagens([...mensagens_enviadas])
        scrollview ? scrollview.scrollToEnd({ animated: true }) : null;
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const carregaUsuarioAnonimo = () => {
    axios.get('https://randomuser.me/api/')
      .then(function (response) {
        const user = response.data.results[0];
        setUser({
          name: userProfile.displayName ? userProfile.displayName  :  `${user.name.first} ${user.name.last}`,
          picture: userProfile.photoURL ? userProfile.photoURL :  user.picture.large 
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  return (
    <KeyboardAvoidingView style={styles.container}>
      
        {/* Header */}
        {user &&
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Room")}>
              <Image style={{ width: 30, height: 30 }} source={btnArrowLeft} />
            </TouchableOpacity>
        <Text style={styles.titlePage}>{room_name}</Text>
            <TouchableOpacity onPress={carregaUsuarioAnonimo}>
              <Image 
                style={{ width: 50,
                   height: 50,
                   borderRadius: 50,
                   borderWidth:2,
                   borderColor:"white" }}
                source={{ uri: user.picture }} />
            </TouchableOpacity>
          </View>
        }

        {/* Body  */}
      
      <View style={styles.containerChat}>
        <ScrollView style={styles.scrollview} ref={(view) => { setScrollview(view) }}>
          {
            mensagens.length > 0 && mensagens.map(item => (
              <View key={item.id} style={styles.linha_conversa}>
                <Image style={styles.avatar_conversa} source={{ uri: item.profilePic }} />
                <View style={{ flexDirection: 'column', marginTop: 5 }}>
                  <Text style={{ fontSize: 14, color: '#999' }}>{item.user}</Text>
                  {typeof (item.mensagem) == "string" ?
                    <View style={ item.mensagem.length > 0 && styles.textBubble}>
                      <Text style={{ fontSize: 12, color : '#000'}} >{item.mensagem}</Text>
                    </View>
                    :
                    <Text></Text>
                  }
                    { item.imagem ? <Image source={{uri:item.imagem}}
                        style={styles.ImageView}/> : null}
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
          {/* Footer > ./footer  Arquivo */}
      <Footer
      save={salvar}
      sendImage={setSavePicture}
      onChangeText={setCaixaTexto}
      onDestroy={closeModal}
      value={caixaTexto}
      />
    </KeyboardAvoidingView>
  )

}
