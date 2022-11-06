<template>
  <div 
    v-if="isShow"
    class="w-[318px] bg-white shadow-lg text-Branddark p-[24px] rounded-lg"
    >
    <div className="flex justify-between">
      <span className="font-bold">{{formTitle}}</span>
      <button @click="closeForm">
        <span><i class="fas fa-xmark text-brandGray"></i></span>
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="mt-8 flex flex-col gap-6">
      <base-input id="title" label="Title" v-model="fieldTitle" :error="errorFieldTitle"/>
      <base-input id="address" label="Address" v-model="fieldAddress" :error="errorFieldAddress"/>
      <div>
        <span className="text-xs text-Brandblue">CONTACT INFORMATION</span>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full mt-4" />
      </div>
      <base-input id="fullName" label="Full Name" v-model="fieldFullName" :error="errorFieldFullName"/>
      <base-input id="jobPosition" label="Job Position" v-model="fieldJobPosition" :error="errorFieldJobPosition"/>
      <base-input type="email" id="emailAddress" label="Email Address" v-model="fieldEmailAddress" :error="errorFieldEmailAddress"/>
      <base-input id="phoneNumber" label="Phone" v-model="fieldPhoneNumber" :error="errorFieldPhoneNumber"/>
      <div>
        <button 
          class="py-[8px] px-[16px] text-white rounded-md" 
          :class="[isDisabled ? 'bg-Brandgray' : 'bg-Brandblue']"
          type="submit"
          :disabled ="isDisabled"
          >Save</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useOfficeStore, useNotificationStore } from '@/stores/index';
import { useField, configure } from 'vee-validate';
import { defineEmits, defineProps, toRefs, computed } from 'vue';
import * as yup from 'yup';
import BaseInput from './BaseInput.vue';

configure({
  validateOnInput: true,
  validateOnChange: false,
  validateOnBlur: true,
  validateOnModelUpdate: true,
})

const props = defineProps({
  formTitle: {
    type: String,
    default: "",
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  fullName: {
    type: String,
    default: ""
  },
  jobPosition: {
    type: String,
    default: ""
  },
  emailAddress: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  officeId: {
    type: Number,
    default: 0
  }
});

const storeOffice = useOfficeStore()
const notificationStore = useNotificationStore()
const {fullName, emailAddress, jobPosition, address, phoneNumber, title} = toRefs(props)
const emit = defineEmits(['formVisibility'])
const onSubmit = () => {
  const office = {
    title: fieldTitle.value,
    address: fieldAddress.value,
    name: fieldFullName.value,
    phone: fieldPhoneNumber.value,
    email: fieldEmailAddress.value,
    job: fieldJobPosition.value,
  }
  if(props.isEdit) {
    storeOffice.updateOffice({
      id: props.officeId,
      ...office
    })
    notificationStore.updateNotification("Success update office")
  } else {
    storeOffice.addOffice({
      id: storeOffice.getLastOfficeId + 1,
      ...office
    })
    notificationStore.updateNotification("Success add office")
  }

  emit('formVisibility',false);
  resetValue();
}
const closeForm = () => emit("formVisibility", !props.isShow) 
const { value: fieldTitle , errorMessage: errorFieldTitle } = useField(title, yup.string().required(),{
  initialValue: title
})
const { value: fieldAddress , errorMessage: errorFieldAddress } = useField(address, yup.string().required(),{
  initialValue: address
})
const { value: fieldPhoneNumber , errorMessage: errorFieldPhoneNumber } = useField(phoneNumber, yup.string().required(),{
  initialValue: phoneNumber
})
const { value: fieldJobPosition , errorMessage: errorFieldJobPosition } = useField(jobPosition, yup.string().required(),{
  initialValue: jobPosition
})
const { value: fieldEmailAddress , errorMessage: errorFieldEmailAddress } = useField(emailAddress, yup.string().required(),{
  initialValue: emailAddress
})
const { value: fieldFullName , errorMessage: errorFieldFullName } = useField(fullName, yup.string().required(),{
  initialValue: fullName
})
const isDisabled = computed(() => {
  if(fieldTitle.value && fieldAddress.value && fieldPhoneNumber.value && fieldJobPosition.value && fieldEmailAddress.value && fieldFullName.value) {
    return false
  }
  return true
})

const resetValue = () => {
  fieldTitle.value = ''
  fieldAddress.value = ''
  fieldFullName.value = ''
  fieldJobPosition.value = ''
  fieldPhoneNumber.value = ''
  fieldEmailAddress.value = ''
}
</script>