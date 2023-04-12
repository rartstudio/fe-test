import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotificationStore } from './notification';

export const useUserStore = defineStore('user',{
    state: () => ({
        users: [],
    }),
    actions: {
      async getAllUsers(){
        await axios.get('https://fakestoreapi.com/users')
        .then((res) => {
          console.log(res);
            this.users = res.data;
        })
        .catch((error) => {
          console.log(error)
        });
      },
      async createUser(userData) {
        const notificationStore = useNotificationStore();
        await axios.post('https://fakestoreapi.com/users', userData)
        .then((res) => {
            this.users.unshift(res.data);
            notificationStore.updateNotification('Success Add User', false);
        })
        .catch((error) => {
          notificationStore.updateNotification(error.message, true);
            // error.response.status Check status code
        });
      },
      async updateUser(userData, userId) {
        const notificationStore = useNotificationStore();
        await axios.put(`https://fakestoreapi.com/users/${userId}`, userData)
        .then((res) => {
          notificationStore.updateNotification('Success Update User', false);
          console.log(res);
        })
        .catch((error) => {
          notificationStore.updateNotification(error.message, true);
          console.log(error)
        });
      },
      async deleteUser(userData, userId) {
        await axios.delete(`https://fakestoreapi.com/users/${userId}`)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    getters: {
      getUsers: (state) => state.users,
    }
});
