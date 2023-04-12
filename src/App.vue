<template>
  <div class="flex flex-col justify-start items-center pt-32 bg-slate-100 min-h-screen">
    <div v-if="notificationStore.notification" :class="[notificationStore.isError ? 'bg-Brandred hover:bg-Brandred/90' : 'bg-BrandGreen hover:bg-BrandGreen/90','mb-8 w-[360px] h-[56px] flex justify-between items-center text-white py-[16px] px-[24px] rounded-lg cursor-pointer shadow-xl']">
      <span><i class="fas fa-envelope text-white"></i></span>
      <span>{{notificationStore.getNotificationMessage}}</span>
      <button @click="closeNotification"><i class="fas fa-close text-white"></i></button>
    </div>
    <template v-if="authStore.isAuthenticated">
      <h1 class="text-6xl text-Brandblue mb-8" id="header-title">Users</h1>
      <form-user v-if="isFormShow" :isShow="isFormShow" @form-visibility="updateFormState" formTitle="New Location"/>
      <button id="button-new-location" v-else @click="openForm" class="w-[360px] h-[56px] bg-Brandblue flex justify-between items-center text-white py-[16px] px-[24px] rounded-lg cursor-pointer hover:bg-Brandblue/90 shadow-xl">
        <span>Add New User</span>
        <span><i class="fas fa-plus text-white"></i></span>
      </button>
      <div class="mt-8 mb-36 ">
        <div class="flex flex-col">
          <card-user v-for="user in getUsers" :key="user.id" :user="user"></card-user>
        </div>
      </div>
    </template>
    <template v-else>
      <form-login/>
    </template>
  </div>
</template>

<script setup>
import { useAuthStore, useNotificationStore, useUserStore } from '@/stores/index'
import FormLogin from "@/components/FormLogin.vue"
import CardUser from "./components/CardUser.vue"
import { ref, onMounted, computed } from "vue"
const notificationStore = useNotificationStore()
const authStore = useAuthStore();
const closeNotification = () => notificationStore.resetNotification()
const userStore = useUserStore();
onMounted(() => {
  userStore.getAllUsers();
});
const getUsers = computed(() => {
  return userStore.getUsers
})

const isFormShow = ref(false)
const openForm = () => isFormShow.value = !isFormShow.value
const updateFormState = (value) => isFormShow.value = value
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
