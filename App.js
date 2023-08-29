import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header/Header';
import Timer from './src/components/Timer/Timer';
import { TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'


const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']
export default function App() {
  const [isWorking, setIsWorking] = useState(false)
  const[time, setTime] = useState(0)
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')
  const [isActive, setIsActive] = useState(false)

  const playSound = async() => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sonido.mp3')
    )
    await sound.playAsync();
  }
    useEffect(()=>{
      let interval = null
      if (isActive) {
        interval = setInterval(() => {
          setTime(time - 1)
        }, 1000)
      } else {
        clearInterval(interval)
      }

      if (time === 0) {
        setIsActive(false)
        setIsWorking(prev => !prev)
        setTime(isWorking? 300 : 1500)
      }

      return () => clearInterval(interval)
    },[isActive, time])

  const handleActive = () => {
    playSound()
    setIsActive(!isActive)
  }

  return (
    <SafeAreaView
     
    style={[styles.container, {backgroundColor:colors[currentTime]}]}>
      <View style={{
          flex: 1,
          paddingHorizontal:15,
          paddingTop: Platform.OS === "android" && 30}}>
        <Text style={styles.text}>Pomodoro</Text>
        <StatusBar style="auto" />
        <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime}/>
        <Timer time={time}/>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleActive()}
        >
          <Text
            style={styles.textButton}
          >{isActive? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:15
  },
  text:{
    fontSize:32,
    fontWeight:'bold'
    
  },
  button:{
    backgroundColor:'#333333',
    padding:15,
    marginTop:15,
    borderRadius:15,
    alignItems:'center'
  },
  textButton:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }

});
