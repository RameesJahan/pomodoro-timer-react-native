import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState } from 'react-native';

export default useTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);
  const pausedTimeRef = useRef(0);
  


  const updateTimer = useCallback(() => {
    if(time >= 0) {
      setTime(prev => prev - 1);
      pausedTimeRef.current = Date.now();
    }
  },[time])

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(updateTimer, 1000); //TODO: change to 1000
  },[updateTimer]);

  const handleAppStateChange = useCallback((nextAppState) => {
    if (nextAppState === 'active' && isRunning) {
      const now = Date.now();
      const diff = Math.floor((now - pausedTimeRef.current)/ 1000);
      const remTime = time - diff;
      setTime(remTime);
      startTimer();
    } else if (nextAppState === 'background' && isRunning) {
      clearInterval(intervalRef.current);
    }
  }, [isRunning, startTimer]);

  useEffect(() => {
    if(time <= 0) {
      setIsFinished(true);
      setTime(0);
      pause();
    }  
  }, [time]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [handleAppStateChange]);
  

  const start = useCallback(() => {
    if (!isRunning && !isFinished && time > 0) {
      setIsRunning(true);
      setIsFinished(false);
      startTimer();
    }
  }, [isRunning, startTimer]);

  const pause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const reset = useCallback((newTime) => {
    setIsRunning(false);
    setIsFinished(false);
    setTime(newTime || initialTime);
    clearInterval(intervalRef.current);
  }, [initialTime]);

  return { time, isRunning, start, pause, reset, isFinished };
};