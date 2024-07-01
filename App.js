import { StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Timer from './components/Timer/Timer';
import COLORS from './constants/COLORS';
import * as Linking from 'expo-linking';

export default function App() {

  const PRIVACY_URL = 'http://kaakka.tech/pomodoro-timer-privacy-policy/'

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('./assets/icon.png')}
        />
      </View>
      <View style={{padding: 25}}>
        <Timer />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed By Kaakka Apps</Text>
        <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_URL)}>
          <Text style={styles.footerTextLink}>PRIVACY POLICY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: '100%',
  },
  image: {
    width: 48,
    height: 48,
    backgroundColor: '#0553',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footer:{
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  footerText:{
    fontSize: 18,
    fontWeight: '500'
  },
  footerTextLink:{
    color: '#2776ff',
    fontWeight: '500',
    textDecorationLine: 'underline',
  }
});
