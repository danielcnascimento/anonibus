import React, { useState, useEffect } from 'react'
import {View, Image, Text, TextInput,
  TouchableOpacity, KeyboardAvoidingView,
  Animated, Keyboard} from "react-native";
import logoWhite from '../assets/logoWhite.png'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context';
import firebase from 'firebase';

export default CreateAccount = () => {

  const [textEmail, setTextEmail] = React.useState('')
  const [textNickname, setTextNickname] = React.useState('')
  const [textPassword, setTextPassword] = React.useState('')

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(textEmail, textPassword)
      .then(() => {
          firebase.auth().currentUser.updateProfile({displayName:textNickname})
          signUp()
        })
      .catch(error => alert(error))
  }

  const navigation = useNavigation()

  function SignIn() {
    navigation.navigate('SignIn')
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

  const { signUp } = React.useContext(AuthContext)

  return (

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
    value={textEmail}/>

    <TextInput 
    secureTextEntry={true} 
    placeholder="Senha" 
    style={styles.input}
    onChangeText={text => setTextPassword(text)}
    value={textPassword} secureTextEntry={true}
    />

    <TextInput 
    placeholder="Mas pode me chamar de..." 
    autoCorrect={false} 
    style={styles.input} 
    onChangeText={text => setTextNickname(text)}
    value={textNickname}/>

    <TouchableOpacity style={styles.btnSubmit} onPress={() => handleSignUp()} >
        <Text style={styles.submitText}>Cadastrar</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btnRegister} onPress={SignIn}>
        <Text style={styles.registerText}>Já tenho login!</Text>
    </TouchableOpacity>

</Animated.View>

</KeyboardAvoidingView>
  )}

