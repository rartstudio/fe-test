import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notifications',{
  state: () => ({
    notification: false,
    notificationMessage: ""
  }),
  actions: {
    resetNotification(){
      this.notification = false
      this.notificationMessage = ''
    },
    updateNotification(message){
      this.notificationMessage = message
      this.notification = true
    }
  },
  getters: {
    getNotification: (state) => state.notification,
    getNotificationMessage: (state) => state.notificationMessage
  }
});
