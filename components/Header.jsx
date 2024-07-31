import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'
import { IconSettings } from '../assets/icons/SvgIcons'

const Header = ({ onPressSettings, isTimerRunning }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, isTimerRunning && styles.hiddenIconContainer]}>
        <Pressable onPress={onPressSettings}>
          <IconSettings size={28} weight={1} color={COLORS.black} />
        </Pressable>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 18,
  },
  iconContainer: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999999,
    backgroundColor: COLORS.greenWhite,
    elevation: 12,
    shadowColor: '#00000081',
  },
  hiddenIconContainer: {
    opacity: 0
  }
})