<template>
  <div class="mb-8">
    <form-location 
      v-if="isFormShow" 
      :isShow="isFormShow" 
      @form-visibility="updateFormState" 
      formTitle="Edit Location" 
      :full-name="office.name"
      :address="office.address"
      :title="office.title"
      :email-address="office.email"
      :job-position="office.job"
      :phone-number="office.phone"
      :is-edit="true"
      :office-id="office.id"
    />
    <template v-else>
      <button @click="toggleCardContentShow">
        <div 
          class="w-[317px] h-[108px] flex justify-between items-center p-[24px] shadow-lg cursor-pointer"
          :class="[cardContentShow ? 'bg-BrandDarkgray rounded-t-lg' : 'bg-white rounded-lg']"
          >
          <div class="flex flex-col gap-y-2 items-start">
            <span 
              class="font-bold text-2xl"
              :class="[cardContentShow ? 'text-white' : 'text-Branddark']"
              >
              {{office.title}}
            </span>
            <span :class="[cardContentShow ? 'text-white' : 'text-Branddark']">
              {{office.address}}
            </span>
          </div>
          <span v-if="cardContentShow"><i class="fas fa-chevron-down text-white"></i></span>
          <span v-else><i class="fas fa-chevron-down text-Brandblue"></i></span>
        </div>
      </button>
      <div class="bg-white flex flex-col items-start gap-y-2 p-[24px] text-Branddark rounded-b-lg shadow-md" v-if="cardContentShow">
        <span class="text-xl font-bold ">{{office.name}}</span>
        <span>{{office.job}}</span>
        <span class="text-Brandblue">{{office.email}}</span>
        <span>{{office.phone}}</span>
        <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full my-2" />
        <div class="flex justify-between w-full">
          <button class="flex items-center gap-3" @click="toggleFormState">
            <span><i class="fas fa-pencil"></i></span>
            <span class="text-xs">Edit</span>
          </button>
          <button class="flex items-center gap-3" @click="deleteOffice(office.id)">
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
import FormLocation from './FormLocation.vue'
import { useOfficeStore } from '@/stores/index'
const props = defineProps({
  office: {
    type: Object
  }
})
const officeStore = useOfficeStore();
const deleteOffice = (value) => officeStore.deleteOffice(value)
const isFormShow = ref(false)
const updateFormState = (value) => isFormShow.value = value
const toggleFormState = () => isFormShow.value = !isFormShow.value
const cardContentShow = ref(false);
const {office} = toRefs(props);
const toggleCardContentShow = () => cardContentShow.value = !cardContentShow.value
</script>
