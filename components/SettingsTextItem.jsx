import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'

const SettingsTextItem = ({ title, color, onPress }) => {
  return (
    <View style={styles.settingsItem}>
      <Pressable onPress={onPress} >
        <Text style={[styles.settingsItemText, { color: color? color : '#515151' }]}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default SettingsTextItem

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  settingsItemText: {
    fontSize: 14,
    fontWeight: "500",
  },
})