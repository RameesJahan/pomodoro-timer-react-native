import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState, useMemo } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import COLORS from '../constants/COLORS'


const formatTime = (time) => {
  if(time <= 0) return '00:00';
  const h = Math.floor(time / 3600);
  const m = Math.floor(time % 3600 / 60);
  const s = Math.floor(time % 3600 % 60);

  if(h > 0) return `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;

  return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
}

const TimerClock = ({currentTime, maxTime}) => {

  const formatedTime = useMemo(() => {
    return formatTime(currentTime);
  }, [currentTime]);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CircularProgress 
          value={currentTime}
          radius={120}
          maxValue={maxTime}
          showProgressValue={false}
          circleBackgroundColor={COLORS.greenWhite}
          activeStrokeWidth={14}
          activeStrokeColor={COLORS.primary}
          inActiveStrokeWidth={14}
          inActiveStrokeColor={COLORS.gray}
          clockwise={false}
        />
        <Text style={styles.progresValue}>{formatedTime}</Text>
      </View>
    </View>
  )
}

export default TimerClock

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 20
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 12,
    // shadowColor: '#000000',
    borderRadius: 9999999,
    backgroundColor: COLORS.greenWhite,
  },
  progresValue: {
    position: 'absolute',
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.black
  }
})