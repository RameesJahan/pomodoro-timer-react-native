import { StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from './constants/COLORS';
import Header from './components/Header';
import TimerContainer from './components/TimerContainer';
import SettingsModel from './components/SettingsModel';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SettingsProvider } from './contexts/SettingsContext';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const handleUpdateSettings = () => {
    // setIsSettingsVisible(true)
  }


  const handleOnLoadSettings = async() => {
    await SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} >
        <SettingsProvider onLoadSettings={handleOnLoadSettings}>
          <Header isTimerRunning={isTimerRunning} onPressSettings={() => setIsSettingsVisible(true)} />
          <TimerContainer onRunning={(value) => setIsTimerRunning(value)} />
          <SettingsModel visible={isSettingsVisible} onClose={() => setIsSettingsVisible(false)} onUpdateSettings={() => handleUpdateSettings} />
        </SettingsProvider>
      </View>  
      <StatusBar style="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.greenWhite,
  },
  content:{
    flex: 1,
    gap: 10,
  }
});
