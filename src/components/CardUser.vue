<template>
  <div class="mb-8">
    <form-user
      v-if="isFormShow" 
      :isShow="isFormShow" 
      @form-visibility="updateFormState" 
      formTitle="Edit User" 
      :email="user.email"
      :username="user.username"
      :password="user.password"
      :firstname="user.firstname"
      :lastname="user.lastname"
      :phone="user.phone"
      :city="user.address.street"
      :street="user.address.street"
      :number="user.address.number"
      :zipcode="user.adddress.zipcode"
      :lat="user.address.geolocation.lat"
      :long="user.address.geolocation.long"
      :is-edit="true"
      :userid="user.id"
    />
    <template v-else>
      <button @click="toggleCardContentShow">
        <div 
          class="w-[360px] h-[108px] flex justify-between items-center p-[24px] shadow-lg cursor-pointer"
          :class="[cardContentShow ? 'bg-BrandDarkgray rounded-t-lg' : 'bg-white rounded-lg']"
          >
          <div class="flex flex-col gap-y-2 items-start">
            <span 
              class="font-bold text-2xl"
              :class="[cardContentShow ? 'text-white' : 'text-Branddark']"
              >
              {{user.email}}
            </span>
            <span :class="[cardContentShow ? 'text-white' : 'text-Branddark']">
              {{user.name.firstname}} {{user.name.lastname}}
            </span>
          </div>
          <span v-if="cardContentShow"><i class="fas fa-chevron-down text-white"></i></span>
          <span v-else><i class="fas fa-chevron-down text-Brandblue"></i></span>
        </div>
      </button>
      <div class="bg-white flex flex-col items-start gap-y-2 p-[24px] text-Branddark rounded-b-lg shadow-md" v-if="cardContentShow">
        <span class="text-xl font-bold ">Name: {{user.name.firstname}} {{user.name.lastname}}</span>
        <span class="text-Brandblue">Email: {{user.email}}</span>
        <span>Phone: {{user.phone}}</span>
        <span>Address: {{ user.address.street }} {{ user.address.number }} , {{ user.address.city }} {{ user.address.zipcode }}</span>
        <span>Position: {{ user.address.geolocation.lat }} , {{ user.address.geolocation.long }}</span>
        <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full my-2" />
        <div class="flex justify-between w-full">
          <button class="flex items-center gap-3" @click="toggleFormState">
            <span><i class="fas fa-pencil"></i></span>
            <span class="text-xs">Edit</span>
          </button>
          <button class="flex items-center gap-3" @click="deleteUser(user.id)">
            <span><i class="fas fa-trash text-Brandred"></i></span>
            <span class="text-xs text-Brandred">Delete</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, defineProps, toRefs } from 'vue'
import FormUser from './FormUser.vue'
import { useUserStore } from '@/stores/index'
const props = defineProps({
  user: {
    type: Object
  }
})
const userStore = useUserStore();
const isFormShow = ref(false)
const cardContentShow = ref(false);
const { user } = toRefs(props);
const deleteUser = (userId) => userStore.deleteUser(userId)
const updateFormState = (value) => isFormShow.value = value
const toggleFormState = () => isFormShow.value = !isFormShow.value
const toggleCardContentShow = () => cardContentShow.value = !cardContentShow.value
</script>
