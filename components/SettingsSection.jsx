import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SettingsSection = ({ title, children, isEdit, onClickEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.textEditContainer} onPress={onClickEdit}>
          <Text style={styles.textEdit}>{isEdit ? 'Save' : 'Edit'}</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  )
}

export default SettingsSection

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textEditContainer: {

  },
  textEdit: {
    color: '#0000ff',
    fontSize: 14,
    fontWeight: '500'
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black
  },
  content: {
    marginTop: 12
  }
})