import React,{useState, useEffect} from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import btnSend from '../assets/img/btnSend.png'
import btnAddPhoto from '../assets/img/btnAddPhoto.png'
import * as ImagePicker from 'expo-image-picker';
import Modal from './modal';
import firebase from '../config/firebase';

// the massy part


const Footer = props =>{

    const [savePicGal,setSavePicGal] = useState(null);
    const [visible, setVisible] = useState(false);

    const checkText = () =>{
        if(props.value.length > 0){
            props.save()
        }else{
            return
        }
        
    }

    console.log(props.value.length)

    const pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            uploadImage(result.uri)
          }
        } catch (E) {
          console.log(E);
        }
    };

    const uploadImage = async(uri) =>{
        const response = await fetch(uri);
            const blob = await response.blob();
            const filename = new Date().getTime();
            
            const storage = firebase.storage().ref().child("image/" + filename);

            storage.put(blob).then( function (snapshot){
                snapshot.ref.getDownloadURL().then(
                uri => setSavePicGal(uri))
        })
    }

    const {sendImage, onDestroy} = props

    useEffect(()=>{
        if(savePicGal){
        setVisible(true)
        sendImage(savePicGal)
        }
    },[savePicGal,onDestroy])

    //console.log(visible)


    return(
    // The Structure of the footer

    <View style={styles.containerInput}>
        <Modal
          save={()=>{
              props.save()
              setVisible(onDestroy)
        }
        }
          onChangeText={props.onChangeText}
          messagePic={savePicGal}
          visible={visible}
          hidden={()=>setVisible(false)}
        />
        <View style={styles.input}>
            <TextInput
            value={props.value}
            style={styles.inputM} 
            onChangeText={props.onChangeText} 
            placeholder="Insira uma mensagem"/>

            <TouchableOpacity onPress={pickImage}>
                <Image source={btnAddPhoto} />
            </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={checkText}>
            <Image style={{ width: 40, height: 40 }} source={btnSend} />
        </TouchableOpacity>
    </View>
    )
}

    //Styling the footer
const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignItems: 'center',
        padding: 10
    },
    input: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        height: 40,
        borderRadius: 10,
        padding: 10,

    },
    inputM: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
    }
})

export default Footer;