<template>
  <div class="flex flex-col justify-start items-center pt-32 bg-slate-100 min-h-screen">
    <h1 class="text-6xl text-Brandblue mb-8">Offices</h1>
    <div v-if="notificationStore.notification" class="mb-8 w-[317px] h-[56px] bg-BrandGreen flex justify-between items-center text-white py-[16px] px-[24px] rounded-lg cursor-pointer hover:bg-BrandGreen/90 shadow-xl">
      <span><i class="fas fa-envelope text-white"></i></span>
      <span>{{notificationStore.getNotificationMessage}}</span>
      <buttton @click="closeNotification"><i class="fas fa-close text-white"></i></buttton>
    </div>
    <form-location v-if="isFormShow" :isShow="isFormShow" @form-visibility="updateFormState" formTitle="New Location"/>
    <button v-else @click="openForm" class="w-[317px] h-[56px] bg-Brandblue flex justify-between items-center text-white py-[16px] px-[24px] rounded-lg cursor-pointer hover:bg-Brandblue/90 shadow-xl">
      <span>Add New Location</span>
      <span><i class="fas fa-plus text-white"></i></span>
    </button>
    <div class="mt-8 mb-36 ">
      <div className="flex flex-col">
        <card-office v-for="office in officeStore.getOffices" :key="office.id" :office="office"></card-office>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOfficeStore, useNotificationStore } from '@/stores/index'
import FormLocation from "./components/FormLocation.vue"
import CardOffice from "./components/CardOffice.vue"
import { ref } from "vue"
const isFormShow = ref(false)
const officeStore = useOfficeStore()
const notificationStore = useNotificationStore()
const openForm = () => isFormShow.value = !isFormShow.value
const updateFormState = (value) => isFormShow.value = value
const closeNotification = () => notificationStore.resetNotification()
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
