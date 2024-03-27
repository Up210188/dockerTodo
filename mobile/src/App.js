import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import { Camera,CameraType } from 'expo-camera';

export default function App() {
 
    const[type,setType]=useState(CameraType.back)
    const[showCamera,setShowCamera]=useState(false)
    const[permission,requestPermision]=Camera.useCameraPermissions();

  return (
    <View style={styles.container}>
      <Text>{ Constants.deviceName }</Text>
      <CalendarPicker onDateChange ={(date)=>console.log(date)}/>
      <TouchableOpacity style={styles.button} onPress={()=>setShowCamera(true)}>
        <Text style={{color:"#fff"}}>Open camera</Text>
      </TouchableOpacity>
      {showCamera && <Camera type={type}/>}
      <StatusBar style='auto'/>
      <TextInput placeholder='write something'/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:"#54C9FF",
    padding:10,
    borderRadius:5
  }
});
