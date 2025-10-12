import NotifeeNotificationService from "../services/NotifeeNotificationService";

const notifee = new NotifeeNotificationService({
  notificationId: "pomodoro-notification",
  channelId: "pomodoro-channel",
});


export const showTimerNotification = async ({ status, time }) => {
  await notifee.displayNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time`,
    android: {
      ongoing: true,
      showChronometer: true,
      chronometerDirection: "down",
      chronometerCountdown: true,
      timestamp: Date.now() + time * 1000,
    },
  });

  setTimeout(() => notifee.cancelNotification(), time * 1000);
};

export const showPauseNotification = async ({ status }) => {
  await notifee.displayNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time is Paused`,
  });
};

export const showFinishedNotification = async ({ status }) => {
  await notifee.displayNotification({
    title: "Pomodoro - Timer",
    body: `${status} Time is Finished`,
  });
};
