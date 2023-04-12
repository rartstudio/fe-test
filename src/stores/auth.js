import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotificationStore } from './notification';

export const useAuthStore = defineStore('auth',{
    state: () => ({
        isAuthenticated: false,
        token: '',
    }),
    actions: {
      async login(loginData){
        const notificationStore = useNotificationStore();
        axios.post('https://fakestoreapi.com/auth/login', loginData)
        .then((res) => {
            //Perform Success Action
            this.token = res.data.token;
            this.isAuthenticated = true;
            notificationStore.updateNotification('Success Login', false);
        })
        .catch((error) => {
          this.isAuthenticated = false;
          notificationStore.updateNotification(error.message, true);
            // error.response.status Check status code
        });
      },
    },
});
