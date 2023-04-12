<template>
  <div 
    v-if="isShow"
    class="w-[360px] bg-white shadow-lg text-Branddark p-[24px] rounded-lg"
    >
    <div class="flex justify-between">
      <span class="font-bold" id="form-title">{{formTitle}}</span>
      <button @click="closeForm">
        <span><i class="fas fa-xmark text-brandGray"></i></span>
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="mt-8 flex flex-col gap-6" id="form-location">
      <div>
        <span class="text-xs text-Brandblue">ACCOUNT INFORMATION INFORMATION</span>
        <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full mt-4" />
      </div>
      <base-input id="username" label="Username" v-model="fieldUsername" :error="errorFieldUsername"/>
      <base-input type="password" id="password" label="Password" v-model="fieldPassword" :error="errorFieldPassword"/>
      <div>
        <span class="text-xs text-Brandblue">USER INFORMATION</span>
        <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full mt-4" />
      </div>
      <base-input id="email" label="Email" v-model="fieldEmail" :error="errorFieldEmail"/>
      <base-input id="firstname" label="First Name" v-model="fieldFirstname" :error="errorFieldFirstname"/>
      <base-input id="lastname" label="Last Name" v-model="fieldLastname" :error="errorFieldLastname"/>
      <base-input id="phone" label="Phone" v-model="fieldPhone" :error="errorFieldPhone"/>
      <base-input id="city" label="Address City" v-model="fieldCity" :error="errorFieldCity"/>
      <base-input id="street" label="Address Street" v-model="fieldStreet" :error="errorFieldStreet"/>
      <base-input type="number" id="number" label="Address Number" v-model="fieldNumber" :error="errorFieldNumber"/>
      <base-input id="zip-code" label="Address Zip Code" v-model="fieldZipcode" :error="errorFieldZipCode"/>
      <base-input id="lat" label="Geolocation Lat" v-model="fieldLat" :error="errorFieldLat"/>
      <base-input id="long" label="Geolocation Long" v-model="fieldLong" :error="errorFieldLong"/>
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
import { useNotificationStore, useUserStore } from '@/stores/index';
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
  email: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  firstname: {
    type: String,
    default: ""
  },
  lastname: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  street: {
    type: String,
    default: ""
  },
  number: {
    type: String,
    default: ""
  },
  zipcode: {
    type: String,
    default: ""
  },
  lat: {
    type: String,
    default: ""
  },
  long: {
    type: String,
    default: ""
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  userid: {
    type: Number,
    default: 0
  }
});

const storeUser = useUserStore()
const notificationStore = useNotificationStore()
const {email, firstname, lastname, phone, city, street, number, zipcode, lat, long, username, password } = toRefs(props)
const emit = defineEmits(['formVisibility'])
const onSubmit = async () => {
  const user = {
    email: fieldEmail.value,
    username: fieldUsername.value,
    password: fieldPassword.value,
    name: {
      firstname: fieldFirstname.value,
      lastname: fieldLastname.value,
    },
    address: {
      city: fieldCity.value,
      street: fieldStreet.value,
      number: parseInt(fieldNumber.value),
      zipcode: fieldZipcode.value,
      geolocation: {
        lat: fieldLat.value,
        long: fieldLong.value,
      }
    },
    phone: fieldPhone.value,
  }
  if(props.isEdit) {
    await storeUser.updateUser(user, props.userid)
    await storeUser.getAllUser();
    notificationStore.updateNotification("Success update user")
  } else {
    await storeUser.createUser(user);

    notificationStore.updateNotification("Success add user")
  }

  emit('formVisibility',false);
  resetValue();
}
const closeForm = () => emit("formVisibility", !props.isShow) 
const { value: fieldEmail , errorMessage: errorFieldEmail } = useField(email, yup.string().required(),{
  initialValue: email
})
const { value: fieldFirstname , errorMessage: errorFieldFirstname } = useField(firstname, yup.string().required(),{
  initialValue: firstname
})
const { value: fieldLastname , errorMessage: errorFieldLastname } = useField(lastname, yup.string().required(),{
  initialValue: lastname
})
const { value: fieldPhone , errorMessage: errorFieldPhone } = useField(phone, yup.string().required(),{
  initialValue: phone
})
const { value: fieldCity , errorMessage: errorFieldCity } = useField(city, yup.string().required(),{
  initialValue: city
})
const { value: fieldStreet , errorMessage: errorFieldStreet } = useField(street, yup.string().required(),{
  initialValue: street
})
const { value: fieldZipcode , errorMessage: errorFieldZipCode } = useField(zipcode, yup.string().required(),{
  initialValue: zipcode
})
const { value: fieldLat , errorMessage: errorFieldLat } = useField(lat, yup.string().required(),{
  initialValue: lat
})
const { value: fieldLong , errorMessage: errorFieldLong } = useField(long, yup.string().required(),{
  initialValue: long
})
const { value: fieldNumber , errorMessage: errorFieldNumber } = useField(number, yup.string().required(),{
  initialValue: number
})
const { value: fieldUsername , errorMessage: errorFieldUsername } = useField(username, yup.string().required(),{
  initialValue: username
})
const { value: fieldPassword , errorMessage: errorFieldPassword } = useField(password, yup.string().required(),{
  initialValue: password
})

const isDisabled = computed(() => {
  if(fieldEmail.value && fieldFirstname.value && fieldLastname.value && fieldPhone.value && fieldCity.value && fieldStreet.value && fieldNumber.value && fieldZipcode.value && fieldLat.value && fieldLong.value && fieldUsername.value
  && fieldPassword.value) {
    return false
  }
  return true
})
const resetValue = () => {
  
}
</script>