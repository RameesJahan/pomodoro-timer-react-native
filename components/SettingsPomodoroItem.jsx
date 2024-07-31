import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const SettingsPomodoroItem = ({ title, value, onChangeText, placeholder, editable }) => {
  
  return (
    <View style={styles.settingsItem}>
      <Text style={styles.settingsItemText}>{title}</Text>
      <View style={styles.settingsItemValue}>
        <TextInput
          style={[styles.settingsItemInput, !editable && styles.settingsItemInputDisabled]}
          keyboardType="numeric"
          value={value}
          maxLength={3}
          onChangeText={onChangeText}     
          placeholder={placeholder}    
          placeholderTextColor={'#6b6b6b'}
          editable={editable}
        />
        <Text style={styles.settingsItemText}> min</Text>
      </View>
    </View>
  );
};

export default SettingsPomodoroItem;

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  settingsItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#515151",
  },
  settingsItemInput: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
    paddingHorizontal: 6,
    textAlign: "right",
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  settingsItemInputDisabled:{
    borderWidth: 0
  },
  settingsItemValue: {
    flexDirection: "row",
    alignItems: "center",
  },
});
