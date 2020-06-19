import React from 'react'
import { View, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'


import { AuthContext } from '../context';
import firebase from 'firebase';
import logoWhite from '../assets/logoWhite.png'
import logoIcon from '../assets/img/logoIcon.png'
import arrowRight from '../assets/img/arrowRight.png'
import iconProfile from '../assets/img/iconProfile.png'
import logout from '../assets/img/logout.png'

import styles from './styles'

export default function Room() {


    const navigation = useNavigation()

    function navigationToLogin() {
        navigation.navigate('SignIn')
    }
    function navigationToProfile() {
        navigation.navigate('Profile')
    }
    function navigationToRoomChat() {
        navigation.navigate('Chat')
    }

    const { signOut } = React.useContext(AuthContext)

    const handleSignOut = () => {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        signOut();
      }).catch(function (error) {
        alert(error)
      });
    }

    return (

        <KeyboardAvoidingView style={styles.background} >

            <View style={styles.containerLogo} >
                <Image source={logoWhite} />
            </View>
            <View style={styles.container} >

                <TouchableOpacity style={styles.btnSubmit} onPress={()=>{
                    navigation.navigate('Chat',{group:'sala_1', room_name: 'Ponto 1'})}}>
                    <View style={styles.btnContainer}>
                        <Image style={styles.btnIcon} source={logoIcon} />
                        <Text style={styles.submitText}>Ponto 1</Text>
                        <Image style={styles.arrowRight} source={arrowRight} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit}  onPress={()=>{
                    navigation.navigate('Chat',{group:'sala_2', room_name: 'Ponto 2'})}}>
                    <View style={styles.btnContainer}>
                        <Image style={styles.btnIcon} source={logoIcon} />
                        <Text style={styles.submitText}>Ponto 2</Text>
                        <Image style={styles.arrowRight} source={arrowRight} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit}  onPress={()=>{
                    navigation.navigate('Chat',{group:'sala_3' , room_name: 'Ponto 3'})}}>
                    <View style={styles.btnContainer}>
                        <Image style={styles.btnIcon} source={logoIcon} />
                        <Text style={styles.submitText}>Ponto 3</Text>
                        <Image style={styles.arrowRight} source={arrowRight} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.containerMenu}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Image style={styles.btnIconMenu} source={logout} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigationToProfile} >
                    <Image style={styles.btnIcon} source={iconProfile} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}