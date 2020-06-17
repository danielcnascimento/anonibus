import React from 'react'
import { Modal, Portal,Text,TextInput, Button} from 'react-native-paper';
import{Image,View , StyleSheet} from "react-native"

const ModalMsg= props =>{

const onDestroy = () =>{
    props.save
}
    
return (
    
    <Portal>
    
    <Modal visible={props.visible}>
    <View style={styles.container}>
    <Image source={{uri:props.messagePic}}
    style={{height:200, width:300}} />
      <Text>Example Modal</Text>
      <View style={{flexDirection:"row"}}>
      <TextInput style={{
            flex:1,
            margin:5,
            backgroundColor:"white" }} 
            onChangeText={props.onChangeText} label="send a message" mode="outline"/>
      <Button
        mode="outlined" 
        onPress={props.save}
        style={styles.btn}
      >
          send
      </Button>
      </View>
      </View>
    </Modal>
 
  </Portal>

)
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:"white",
          alignItems:"center", 
          height:300,
          padding:5
        },
        btn:{
            margin:10 ,
             alignSelf:"flex-end" 
            }
})
export default ModalMsg;