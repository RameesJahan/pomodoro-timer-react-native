import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IconCross } from "../assets/icons/SvgIcons";
import COLORS from "../constants/COLORS";
import SettingsSection from "./SettingsSection";
import SettingsPomodoroItem from "./SettingsPomodoroItem";
import useSettings from "../hooks/useSettings";
import { SettingsContext } from "../contexts/SettingsContext";
import SettingsTextItem from "./SettingsTextItem";

const SettingsModel = ({ visible, onClose, onUpdateSettings }) => {
  const Settings = useContext(SettingsContext);
  
  const [focusTime, setFocusTime] = useState('25');
  const [breakTime, setBreakTime] = useState('5');
  const [longBreakTime, setLongBreakTime] = useState('15');
  const [isEditPomodoro, setIsEditPomodoro] = useState(false);

  const SavePomodoroSettings = () => {
    setIsEditPomodoro(false)
    if(focusTime == '') { 
      Settings.updateFocusTime('25')
      setFocusTime('25')
     }
     if(breakTime == '') { 
      Settings.updateBreakTime('5')
      setBreakTime('5')
     }
     if(longBreakTime == '') {
      Settings.updateLongBreakTime('15')
      setLongBreakTime('15')
     }

    Settings.updateAll(focusTime, breakTime, longBreakTime);
    onUpdateSettings()
  }

  const handlePomodoroEditClick = () => {
    if(isEditPomodoro) SavePomodoroSettings();
    else setIsEditPomodoro(true)
  }

  useEffect(() => {
    setFocusTime(Settings.focusTime)
    setBreakTime(Settings.breakTime)
    setLongBreakTime(Settings.longBreakTime)
  }, [Settings.focusTime, Settings.breakTime, Settings.longBreakTime])
  
  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{ fontSize: 22, fontWeight: "700", color: COLORS.black }}
          >
            Settings
          </Text>
          <TouchableOpacity onPress={onClose}>
            <IconCross size={28} weight={1.5} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View>
          <SettingsSection title="Pomodoro" isEdit={isEditPomodoro} onClickEdit={handlePomodoroEditClick}>
            <SettingsPomodoroItem
              key={"pomodoro-focus-time"}
              title="Focus time"
              value={focusTime}
              placeholder="25"
              onChangeText={(text) => setFocusTime(text)}
              editable={isEditPomodoro}
            />
            <SettingsPomodoroItem
              key={"pomodoro-break-time"}
              title="Break time"
              value={breakTime}
              placeholder="5"
              onChangeText={(text) => setBreakTime(text)}
              editable={isEditPomodoro}
            />
            <SettingsPomodoroItem
              key={"pomodoro-long-break-time"}
              title="Long break time"
              value={longBreakTime}
              placeholder="15"
              onChangeText={(text) => setLongBreakTime(text)}
              editable={isEditPomodoro}
            />
            <SettingsTextItem 
              title="Restore default" 
              color={'#ff5e5e'} 
              onPress={() => Settings.updateAll('25', '5', '15')}
              />
          </SettingsSection>

        </View>
        <View style={styles.footer}>
          <Text>Developed by Kaakka Apps</Text>
          <Text style={styles.footerVersionText}>Version: 2.0.0</Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://kaakka.tech/pomodoro-timer-privacy-policy/")}>
            <Text style={{ color: COLORS.primary }}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  content: {
    padding: 18,
  },
  footer: {
    alignItems: "center",
    padding: 18,
  },
  footerVersionText: {
    color: COLORS.gray,
  },
});
