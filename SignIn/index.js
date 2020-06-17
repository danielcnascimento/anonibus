import React, { useState, useEffect, useContext } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Animated, Keyboard
} from "react-native";
import { useNavigation } from '@react-navigation/native'
import { AuthContext, UserID } from '../context';
import logoWhite from '../assets/logoWhite.png'
import styles from './styles'
import firebase from 'firebase';

export default SignIn = ({}) => {

  const { signIn } = React.useContext(AuthContext)

  const [textEmail, setTextEmail] = useState('')
  const [textPassword, setTextPassword] = useState('')
  const [userMainID, setUserMainID] = useState(null)

  console.log(userMainID)

  const handleSignIn = async() => {
      let myuserid
      //const response = await 
      firebase.auth()
      .signInWithEmailAndPassword(textEmail, textPassword)
      .then((response) =>{
        myuserid=response.user.uid
        setUserMainID(myuserid)
      }
      ).then( ()=> signIn()).catch( error => alert(error))
        
      //   console.log(myuserid)
        
      //   
      // }
      // catch{
      //  
      // }
      
  }

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }))
  const [opacity] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({ x: 270, y: 65 }))
  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    Animated.parallel([

      Animated.spring(offset.y, {
        toValue: 0,
        speed: 0.3,
        bounciness: 5
      }),
      Animated.timing(
        opacity, {
        toValue: 1,
        duration: 800
      }
      )
    ]).start()
  }, [])

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 165,
        duration: 300,
      }),
      Animated.timing(logo.y, {
        toValue: 42,
        duration: 300,
      })
    ]).start()
  }
  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 270,
        duration: 300,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 300,
      })
    ]).start()
  }

  const navigation = useNavigation()

  function navigationToRegister() {
    navigation.navigate('CreateAccount')
  }

  return (
  <UserID.Provider value={userMainID}>
    <KeyboardAvoidingView style={styles.background} >
      <View style={styles.containerLogo} >
        <Animated.Image style={{
          width: logo.x,
          height: logo.y
        }} source={logoWhite} />
      </View>
      <Animated.View style={[styles.container, {
        opacity: opacity,
        transform: [
          { translateY: offset.y }
        ]
      }]} >

        <TextInput
          placeholder="E-mail"
          autoCorrect={false}
          style={styles.input}
          onChangeText={text => setTextEmail(text.toLowerCase())}
          value={textEmail} />

        <TextInput
          placeholder="Senha"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={text => setTextPassword(text)}
          value={textPassword} secureTextEntry={true} />


        <TouchableOpacity style={styles.btnSubmit} onPress={() => handleSignIn()} >
          <Text style={styles.submitText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigationToRegister} style={styles.btnRegister}>
          <Text style={styles.registerText}>Não tenho login!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.termos} >
          <Text style={styles.termosText}> Termos de uso </Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  </UserID.Provider>
  )
}



