import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notifications',{
  state: () => ({
    notification: false,
    notificationMessage: "",
    isError: false,
  }),
  actions: {
    resetNotification(){
      this.notification = false
      this.notificationMessage = ''
    },
    updateNotification(message, status){
      this.notificationMessage = message
      this.notification = true
      this.isError = status
    }
  },
  getters: {
    getNotification: (state) => state.notification,
    getNotificationMessage: (state) => state.notificationMessage
  }
});
