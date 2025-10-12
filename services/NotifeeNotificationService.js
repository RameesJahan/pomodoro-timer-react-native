import notifee, { AuthorizationStatus, EventType } from "@notifee/react-native";

notifee.onForegroundEvent(({ type, detail }) => {
  console.log("Foreground Event", type, detail);
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log("Background Event", type, detail);
});

/**
 * @class NotifeeNotificationService
 * @description Service for handling Notifee notifications
 */
class NotifeeNotificationService {
  channelId = null;
  notificationId = null;

  /**
   * @constructor
   * @param {Object} params - constructor parameters
   * @param {string} [params.channelId] - notification channel id (defaults to "default")
   * @param {string} [params.channelName] - notification channel id (defaults to "default")
   * @param {string} params.notificationId - notification id (required)
   */
  constructor(params) {
    console.log("Initializing NotifeeNotificationService");
    this.channelId = params.channelId || "default";
    this.channelName =
      params.channelName || params.channelId?.toUpperCase() || "DEFAULT";
    this.notificationId = params.notificationId;

    console.log(this.channelId, this.channelName, this.notificationId);
  }

  static cancelAllNotifications() {
    notifee.cancelAllNotifications();
  }

  /**
   * Displays a notification using Notifee
   * @async
   * @param {Object} notificationOptions - Options for the notification
   * @param {string} notificationOptions.title - Title of the notification
   * @param {string} notificationOptions.body - Body text of the notification
   * @param {import("@notifee/react-native").NotificationAndroid} [notificationOptions.android] - Android specific options
   * @param {Object} [notificationOptions.ios] - iOS specific options
   * @param {Object.<string, (string|number|Object)>} [notificationOptions.data] - Data associated with the notification
   * @returns {Promise<string>} - Promise resolving to the notification ID
   * @throws {Error} - If notification display fails
   */
  async displayNotification({ title, body, android, ios, data }) {
    try {
      const permission = await notifee.requestPermission();
      if (permission.authorizationStatus === AuthorizationStatus.DENIED) return;
      let channel = await notifee.getChannel(this.channelId);
      if (channel === null) {
        channel = await notifee.createChannel({
          id: this.channelId,
          name: this.channelName,
        });
      }

      console.log(channel);

      await notifee.displayNotification({
        id: this.notificationId,
        title,
        body,
        data: data,
        android: {
          channelId: channel.id,
          ...android,
        },
        ios,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Displays a notification using Notifee
   * @async
   * @param {Object} notificationOptions - Options for the notification
   * @param {string} notificationOptions.title - Title of the notification
   * @param {string} notificationOptions.body - Body text of the notification
   * @param {import("@notifee/react-native").NotificationAndroid} [notificationOptions.android] - Android specific options
   * @param {Object} [notificationOptions.ios] - iOS specific options
   * @param {Object.<string, (string|number|Object)>} [notificationOptions.data] - Data associated with the notification
   * @param {import("@notifee/react-native").TimestampTrigger} notificationOptions.trigger - Trigger for the notification
   * @returns {Promise<string>} - Promise resolving to the notification ID
   * @throws {Error} - If notification display fails
   */
  async displayTriggerNotification({
    title,
    body,
    android,
    ios,
    data,
    trigger,
  }) {
    try {
      const permission = await notifee.requestPermission();
      if (permission.authorizationStatus === AuthorizationStatus.DENIED) return;
      let channel = await notifee.getChannel(this.channelId);
      if (channel === null) {
        channel = await notifee.createChannel({
          id: this.channelId,
          name: this.channelName,
        });
      }

      console.log(channel);

      await notifee.createTriggerNotification(
        {
          id: this.notificationId,
          title,
          body,
          data: data,
          android: {
            channelId: channel.id,
            ...android,
          },
          ios,
        },
        trigger
      );
    } catch (error) {
      if (error instanceof Error)
        console.log("Trigger Notification Error:", error.stack);
      console.log("Trigger Notification Error:", error);
    }
  }

  async cancelNotification() {
    if (this.notificationId) {
      console.log("Cancelling Notification");
      await notifee.cancelNotification(this.notificationId);
    }
  }
}

export default NotifeeNotificationService;
