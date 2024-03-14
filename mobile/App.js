import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    });
  }, []);

  return (
    <View style={{ marginTop: Constants.statusBarHeight}}>
      <Text>{ Constants.deviceName }</Text>
      <StatusBar style='auto'/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
