import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {Camera, CameraType} from 'expo-camera';
import CalendarPicker from 'react-native-calendar-picker';
// import {Calendar} from 'react-native-calendars';

export default function App() {
    // const [selected, setSelected] = useState('');
    // useEffect(() => {
    //     fetch('https://rickandmortyapi.com/api/character')
    //     .then(resp => resp.json())
    //     .then(json => {
        
    //     });
    // }, []);
    const [type, setType] = useState(CameraType.back);
    const [showCamera, setShowCamera] = useState(false);
    const [permission, requestPermision] = Camera.useCameraPermissions();

    return (
        <View style={styles.container}>
            <Text>{ Constants.deviceName }: Hola mundo</Text>
            <TextInput
                placeholder='Escribe algo!!'
            />
            <CalendarPicker onDateChange={(date)=>console.log(date)}/>
            <TouchableOpacity style={styles.button} onPress={()=> {
                setShowCamera(true);
            }} >
                <Text style={{color:"#fff"}}>Open the camera</Text>
            </TouchableOpacity>
            {showCamera && <Camera style={{flex: 1}} type={type}/>}
            {/* <Calendar
              onDayPress={day => {
                console.log('selected day', day);
              }}
              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              }}
            /> */}
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  button: {
    backgroundColor: '#54C9FF',
    padding: 10,
    borderRadius: 5
  }
});