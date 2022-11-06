<template>
  <div class="flex flex-col justify-start items-start">
    <label :for="id" v-if="label">
      {{label}}
      <span class="text-Brandgray">*</span>
    </label>
    <input
      class="border rounded-md mt-2 w-full p-2 focus:outline-Brandblue"
      :id="id" :type="type" :value="modelValue" :name="id" @input="updateInput"
      :class="[error ? 'border-Brandred' : 'border-Branddark']"
    />
    <span v-if="error" class="text-red-600 text-xs mt-1">{{error}}</span>
  </div>
</template>
<script setup>
import {defineProps, defineEmits, toRefs} from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "", 
  },
  type: {
    type: String,
    default: "text"
  },
  error: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(['update:modelValue']);
const {error, type, label, id} = toRefs(props);
const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
}
</script>