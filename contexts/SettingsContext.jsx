import React,{ createContext, useCallback, useEffect, useState } from "react";
import useSettings from "../hooks/useSettings";


export const SettingsContext = createContext()

export const SettingsProvider = ({children, onLoadSettings}) => {
  

  const Settings = useSettings();

  useEffect(() => {
    if(!Settings.isLoading) onLoadSettings();
  }, [Settings.isLoading])

  return (
    <SettingsContext.Provider value={Settings}>
      { children }
    </SettingsContext.Provider>
  )
}