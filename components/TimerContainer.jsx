import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TimerClock from "./TimerClock";
import COLORS from "../constants/COLORS";
import { IconPause, IconPlay } from "../assets/icons/SvgIcons";
import useTimer from "../hooks/useTimer";
import NotificationService from "../services/NotificatinService";
import usePomodoro from "../hooks/usePomodoro";

const notificationService = NotificationService.getInstance();


const TimerContainer = ({ onRunning }) => {
  const { time,status, maxTime, isRunning, start, pause, reset } = usePomodoro();

  const handlePlayPause =() => {
    if(isRunning){
      pause();
    }else{
      start();
    }
  };

  const handleReset = () => {
    if(!isRunning){
      reset();
    }
  }

  useEffect(() => {
    // Request notification permissions
    (async () => {
      const permissionGranted = await notificationService.requestPermission();
      if (!permissionGranted) {
        const isGranted = await notificationService.askForPermission();
        if (!isGranted) {
          alert('No notification permissions granted!');
        }
      }
    })();

    // Clean up notifications when component unmounts
    return () => {
      notificationService.cancelAllNotifications();
      notificationService.dismissNotifications();
    };
  }, []);

  useEffect(() => {
    onRunning(isRunning);
  }, [isRunning])
  


  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
      <TimerClock key={maxTime} currentTime={time} maxTime={maxTime} />
      <Pressable
        android_ripple={{ color: COLORS.primary, foreground: true }}
        style={styles.btnStart}
        onPress={handlePlayPause}
      >
        {isRunning ? (
          <IconPause weight={1.5} size={64} color={COLORS.primary} />
        ) : (
          <IconPlay weight={1.5} size={64} color={COLORS.primary} />
        )}
      </Pressable>
      <TouchableOpacity disabled={isRunning} style={styles.resetTextContainer} onPress={handleReset}>
        <Text style={[styles.resetText, isRunning && styles.resetTextDisabled]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.greenWhite,
    alignItems: "center",
    paddingVertical: 28,
    gap: 10,
  },
  statusText: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.black,
  },
  btnStart: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999999,
    marginTop: 18,
    elevation: 12,
    shadowColor: '#00000081',
    backgroundColor: COLORS.greenWhite,
    overflow: "hidden",
  },
  resetTextContainer: {
    marginTop: 18,
    alignItems: "center",
  },
  resetText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  resetTextDisabled: {
    color: COLORS.gray,
  }
});
