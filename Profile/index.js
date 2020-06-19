import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import btnArrowLeft from '../assets/img/btnArrowLeft.png'
import logoIconWhite from '../assets/img/logoIconWhite.png'
import iconProfile from '../assets/img/iconProfile.png'
import ChooseProfilePic from '../Upload';
import { AuthContext, UserID} from '../context';
import Modal from './modal';
import firebase from 'firebase';



export default Profile = () => {

  var user = firebase.auth().currentUser;

  const { signOut } = React.useContext(AuthContext)
  const  userMainID  = React.useContext(UserID)
  const [imagem, setImagem] = useState('');
  const [loadPic, setLoadPic] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userNickname, setUserNickname] = useState( user.displayName ? user.displayName : 'Enter a Nickname');

  const handleSignOut = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      signOut();
    }).catch(function (error) {
      alert(error)
    });
  }

  const navigation = useNavigation()

  function navigationToRoom() {
      navigation.navigate('Room');
  }

  useEffect(() => {
    if(user){
      setLoadPic(true)
      setImagem(user.photoURL)
        user.updateProfile({
          displayName:userNickname 
        }).then(()=>{
          setLoadPic(false)
          console.log(user)
        }).catch((error)=>{console.log(error)})
    }
  },[imagem, userNickname])

  const onDelete = () =>{
 
    if(user){

          user.delete().then(function() {
          alert("Tchau ! Mas eu não quis isso... então volte algum dia !")
          signOut()
        }).catch(function(error) {
 
          alert("Processo sensível... Faça login novamente e repita este processo em sequência. ") 
        });
    }
}

return (
  <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
          <View style={styles.iconArrowLeftContainer}>
               <TouchableOpacity onPress={navigationToRoom}> 
                  <Image source={btnArrowLeft} style={styles.iconArrowLeft} />
              </TouchableOpacity>
              <Image source={logoIconWhite} style={styles.iconLogo} />
          </View>
          <View style={styles.containerProfile}>
              {loadPic ?
               <ActivityIndicator size="large"/> :
               <Image style={styles.photoProfile} source={imagem ? {uri:imagem} : iconProfile}/>}
              <Text style={styles.textname}>{userNickname}</Text>
          </View>
          <Modal 
          visible={visible}
          hidden={() => setVisible(false)}
          onChangeText={setUserNickname}
          save={() => setVisible(false)}/>
          <View style={styles.containerMenu}>
              <ChooseProfilePic load={setLoadPic} newPic={setImagem} />
              <TouchableOpacity onPress={() => setVisible(true)} style={styles.itemMenu}>
                  <Text style={styles.textMenu}>Trocar meu apelido</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={styles.itemMenu} >
                  <Text style={styles.textMenuDelete}>Deletar Conta</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemMenu} onPress={handleSignOut}>
                  <Text style={styles.textMenu}>Logout</Text>
              </TouchableOpacity>
          </View>
      </View>
  </KeyboardAvoidingView>
)}



//   return (
//     <View style={styles.container}>
//       <Text>PROFILE</Text>
//       <Button title="Sair" onPress={() => handleSignOut()} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 10,
//     borderRadius: 5
//   }
// 


