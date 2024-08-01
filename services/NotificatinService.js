import * as Notification from 'expo-notifications'

class NotificationService {
  instance = null
  notificationId = null
  constructor() {
    Notification.setNotificationHandler({
      handleNotification: async () => {
        await this.dismissNotifications()
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }
      },
    })
  }

  static getInstance(){
    if(!NotificationService.instance){
      NotificationService.instance = new NotificationService()
    }

    return NotificationService.instance
  }

  async requestPermission( ){
    const { status } = await Notification.getPermissionsAsync()
    return status === 'granted'
  }

  async askForPermission() {
    const { status } = await Notification.requestPermissionsAsync()
    return status === 'granted'
  }

  async scheduleRepeatNotification(content) {
    this.notificationId = await Notification.scheduleNotificationAsync({
      content,
      trigger: {
        seconds: 1,
        repeats: true,
      },
    })
  }

  async scheduleNotification(content, trigger = null) {
    this.notificationId = await Notification.scheduleNotificationAsync({
      content,
      trigger
    })
  }

  async updateNotification(content) {
    
    if (this.notificationId) {
      
      Notification.setNotificationHandler({
        handleNotification: async () => {
          await this.cancelNotification()
          return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }
        },
      });
      this.notificationId = await Notification.scheduleNotificationAsync({
        content,
        trigger: null,
      });
    }
  }

  async cancelNotification() {
    if(this.notificationId){
      await Notification.cancelScheduledNotificationAsync(this.notificationId)
      this.notificationId = null
    }
  }

  async cancelAllNotifications() {
    await Notification.cancelAllScheduledNotificationsAsync()
  }

  async dismissNotifications() {
      await Notification.dismissAllNotificationsAsync()
      this.notificationId = null
  }
}

export default NotificationService