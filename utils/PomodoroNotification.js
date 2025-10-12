import { TriggerType } from "@notifee/react-native";
import NotifeeNotificationService from "../services/NotifeeNotificationService";

const notifee = new NotifeeNotificationService({
  notificationId: "pomodoro-notification",
  channelId: "pomodoro-channel",
});

export const showTimerNotification = async ({ status, time }) => {
  console.log("TriggerType:", TriggerType.TIMESTAMP);
  await notifee.displayNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time`,
    data: { status },
    android: {
      pressAction: {
        id: "default",
        launchActivity: "default",
      },
      ongoing: true,
      showChronometer: true,
      chronometerDirection: "down",
      chronometerCountdown: true,
      timestamp: Date.now() + time * 1000,
    },
  });

  await notifee.displayTriggerNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time is Finished`,
    data: { status },
    sound: "beep_sound.mp3",
    android: {
      ongoing: false,
      pressAction: {
        id: "default",
        launchActivity: "default",
      },
    },
    trigger: {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + time * 1000,
      alarmManager: {
        allowWhileIdle: true,
      },
    },
  });

  // const timerTime = time * 1000;
  // console.log("Timer Time:", timerTime);
  // setTimeout(() => notifee.cancelNotification(), timerTime);
};

export const showPauseNotification = async ({ status }) => {
  await notifee.displayNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time is Paused`,
    data: { status },
  });
};

export const showFinishedNotification = async ({ status }) => {
  await notifee.displayNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time is Finished`,
    data: { status },
  });
};
