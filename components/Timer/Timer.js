import { Text, View, Button, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from 'expo-av';
import COLORS from "../../constants/COLORS";
import useTimer from "../../hooks/useTimer";

export default function Timer() {
  const [isFocus, setIsFocus] = useState(true);
  const [set, setSet] = useState(0);
  const [sound, setSound] = useState();
  const { min, sec, expired, isRunning, start, setMin } = useTimer(1);

  const BREAKE_TIME = 5;
  const FOCUS_TIME = 25;
  const LONG_BREAK_TIME = 20;

  const formatTxt = txt => `0${txt}`.slice(-2)

  async function playSound() {
    //Loading Sound
    const { sound } = await Audio.Sound.createAsync( require('../../assets/sounds/beep-sound.mp3'));
    setSound(sound);

    //Playing Sound
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          //Unloading Sound
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleStartPress = () => {
    start()
  }
  useEffect(() => {
    if(expired) {
      setIsFocus(_prev => !_prev)
      playSound()
    }
  }, [expired])

  useEffect(() => {
    if(isFocus){
      setMin(FOCUS_TIME)
      if(set<4) setSet(_prev => _prev+1)
      else setSet(1)
    }else{
      setMin(() => (set>=4)?LONG_BREAK_TIME:BREAKE_TIME)
    }
  }, [isFocus])
  
  const getBgColor = () => isRunning?COLORS.accentDisable:COLORS.accent

  return (
    <View>
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>{isFocus?'Focus':'Break'}</Text>
      </View>
      <View style={styles.timer}>
        <Text style={styles.time}>
          {formatTxt(min)}:{formatTxt(sec)}
        </Text>
      </View>
      <View style={styles.btnStartContainer}>
        <TouchableOpacity disabled={isRunning} onPress={handleStartPress}>
          <View style={[{backgroundColor: getBgColor()},styles.btnStart]}>
            <Text style={styles.btnStartText}>Start</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 8,
    elevation: 25,
    shadowColor: COLORS.bg,
  },
  time: {
    fontSize: 64,
    fontWeight: "700",
    color: COLORS.primary,
  },
  btnStart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    // backgroundColor: COLORS.accent,
  },
  btnStartContainer: {
    marginTop: 10,
  },
  btnStartText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  actionContainer:{
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 31,
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: COLORS.accent,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  actionText: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: "600",
  }
});
