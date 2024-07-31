import { useContext, useEffect, useState } from "react";
import useSettings from "./useSettings";
import useTimer from "./useTimer";
import NotificationService from "../services/NotificatinService";
import { SettingsContext } from "../contexts/SettingsContext";

export const PomodoroStatus = {
  FOCUS: 'Focus',
  BREAK: 'Break',
  LONG_BREAK: 'Long Break',
}

const notification = NotificationService.getInstance();

export default usePomodoro = () => {
  const Settings = useContext(SettingsContext);
  const Timer = useTimer(Settings.focusTime * 60);

  const [ maxTime, setMaxTime ] = useState(Settings.focusTime * 60);
  const [status, setStatus] = useState(PomodoroStatus.FOCUS);
  const [sets, setSets] = useState(0)
  const { time, isRunning } = Timer;

  const reset = () => {
    setStatus(PomodoroStatus.FOCUS);
    Timer.reset(Settings.focusTime * 60);
    setMaxTime(Settings.focusTime * 60);
    setSets(0);

    notification.cancelAllNotifications();
    notification.dismissNotifications();
  }

  const start = () => {
    if(time <= 0) {
      return
    }
    Timer.start();

    notification.scheduleNotification({
      title: "Pomodoro - Timer",
      body: `${status} time is Started`,
    })
    notification.scheduleNotification({
      title: "Pomodoro - Timer",
      body: `${status} Time is Finished`,
      sound: 'beep_sound.mp3'
    },{
      seconds: time
    })
  }

  const pause = () => {
    Timer.pause();
    notification.cancelAllNotifications();
    notification.dismissNotifications();
    notification.scheduleNotification({
      title: "Pomodoro - Timer",
      body: `${status} Time is Paused`,
    })
  }

  const update = (status) => {
    switch(status) {
      case PomodoroStatus.FOCUS:
        Timer.reset(Settings.focusTime * 60);
        setMaxTime(Settings.focusTime * 60);
        setStatus(PomodoroStatus.FOCUS);
        break;
      case PomodoroStatus.BREAK:
        Timer.reset(Settings.breakTime * 60);
        setMaxTime(Settings.breakTime * 60);
        setStatus(PomodoroStatus.BREAK);
        break;
      case PomodoroStatus.LONG_BREAK:
        Timer.reset(Settings.longBreakTime * 60);
        setMaxTime(Settings.longBreakTime * 60);
        setStatus(PomodoroStatus.LONG_BREAK);
        break;
    }
  }

  useEffect(() => {
    if(Timer.isFinished){
      if(status === PomodoroStatus.FOCUS) {
        setSets((prev) => prev + 1)
        if(sets < 3 ){
          update(PomodoroStatus.BREAK)
        }else{
          update(PomodoroStatus.LONG_BREAK)
          setSets(0)
        }
      }else{
        update(PomodoroStatus.FOCUS)
        
      }
    }
  }, [Timer.isFinished]);
  
  useEffect(() => {
    setMaxTime(Settings.focusTime * 60);
    reset();
  }, [Settings.focusTime]);

  return {
    start,
    pause,
    reset,
    time,
    isRunning,
    status,
    maxTime
  }
}