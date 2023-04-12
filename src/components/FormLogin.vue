<template>
  <div 
    class="w-[360px] bg-white shadow-lg text-Branddark p-[24px] rounded-lg"
    >
    <div class="flex items-center justify-center ">
      <div class="font-bold" id="form-title">Login</div>
    </div>
    <form @submit.prevent="onSubmit" class="mt-8 flex flex-col gap-6" id="form-location">
      <base-input id="username" label="Username" v-model="fieldUsername" :error="errorFieldUsername"/>
      <base-input id="password" label="Password" v-model="fieldPassword" :error="errorFieldPassword" type="password"/>
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
import { useAuthStore } from '@/stores/index';
import { useField, configure } from 'vee-validate';
import { computed } from 'vue';
import * as yup from 'yup';
import BaseInput from './BaseInput.vue';

configure({
  validateOnInput: true,
  validateOnChange: false,
  validateOnBlur: true,
  validateOnModelUpdate: true,
})

const { value: fieldPassword , errorMessage: errorFieldPassword } = useField('', yup.string().required(),{
  initialValue: ''
})
const { value: fieldUsername, errorMessage: errorFieldUsername } = useField('', yup.string().required(), {
  initialValue: '',
})

const authStore = useAuthStore()
const onSubmit = async () => {
  const loginData = {
    username: fieldUsername.value,
    password: fieldPassword.value
  }
  try {
    await authStore.login(loginData);
  } catch(err) {
    console.log(err)
  }
}
const isDisabled = computed(() => {
  if(fieldUsername.value && fieldPassword.value) {
    return false
  }
  return true
})
</script>