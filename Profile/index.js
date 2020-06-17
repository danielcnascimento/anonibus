import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native'
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
  const [visible, setVisible] = useState(false);
  const [userNickname, setUserNickname] = useState( user.displayName ? user.displayName : 'Enter a Nickname');

 
  // const salvar = () => {
  //   api.post('/sendProfileData', {
  //     userCustomName: userCustomName,
  //     customProfilePic: imagem,
  //     userID: userMainID,
  //   })
  //     .then(function () {
  //       // setMensagens([...mensagens, caixaTexto])
  //       setCaixaTexto('')
  //       scrollview.scrollToEnd({ animated: true })
        
  //     }).catch(function () {

  //     })
  //       setCloseModal(false)
  //       setCaixaTexto("")
  //       setSavePicture(null)
  // }

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
      setImagem(user.photoURL)
        user.updateProfile({
          displayName:userNickname 
        }).then(()=>{
          console.log(user)
        }).catch((error)=>{console.log(error)})
    }
  }, [imagem, userNickname])

  const onDelete = () =>{
 
    if(user){

          var credential;
          // Prompt the user to re-provide their sign-in credentials
          user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
          }).catch(function(error) {
            // An error happened.
          });

          user.delete().then(function() {
          alert("Bye ;-; ")
          signOut()
        }).catch(function(error) {
 
          alert("Something went wrong..." + error) 
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
              <Image style={styles.photoProfile} source={imagem ? {uri:imagem} : iconProfile}/>
              <Text style={styles.textname}>{userNickname}</Text>
          </View>
          <Modal 
          visible={visible}
          onChangeText={setUserNickname}
          save={() => setVisible(false)}/>
          <View style={styles.containerMenu}>
              <ChooseProfilePic  />
              <TouchableOpacity onPress={() => setVisible(true)} style={styles.itemMenu}>
                  <Text style={styles.textMenu}>Change nickname</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={styles.itemMenu} >
                  <Text style={styles.textMenuDelete}>Delete account</Text>
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


