import { useCallback, useEffect, useState } from "react"
import StorageService from "../services/StorageService"

export default useSettings = () => {
  const Storage = new StorageService('settings')
  const [focusTime, setFocusTime] = useState('25')
  const [breakTime, setBreakTime] = useState('5')
  const [longBreakTime, setLongBreakTime] = useState('15')
  const [isLoading, setIsLoading] = useState(true)

  const updateFocusTime = async (value) => {
    setFocusTime(value)
    await Storage.set({focusTime: value})
  }
  const updateBreakTime = async (value) => {
    setBreakTime(value)
    await Storage.set({breakTime: value})
  }
  const updateLongBreakTime = async (value) => {
    setLongBreakTime(value)
    await Storage.set({longBreakTime: value})
  }

  const updateAll = async (focusTime, breakTime, longBreakTime) => {
    setFocusTime(focusTime)
    setBreakTime(breakTime)
    setLongBreakTime(longBreakTime)
    await Storage.set({focusTime, breakTime, longBreakTime})
  }

  const restore = async () => {
    setFocusTime('25')
    setBreakTime('5')
    setLongBreakTime('15')
    await Storage.remove()
  }

  const loadData = useCallback(async () => {
    try {
      const data = await Storage.get()

      if (data) {
        setFocusTime(data.focusTime || '25');
        setBreakTime(data.breakTime || '5');
        setLongBreakTime(data.longBreakTime || '15');
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])
  

  return {
    focusTime,
    breakTime,
    longBreakTime,
    isLoading,
    updateFocusTime,
    updateBreakTime,
    updateLongBreakTime,
    updateAll,
    restore
  }
}