<script setup>
defineProps({
  inputTextHeader: {
    type: String,
  },
  fontSize: {
    type: String,
    default: 'text-2xl',
  },
})
</script>

<template>
  <div class="font-bold text-white truncate w-fit" :class="[fontSize]">
    <h1>{{ inputTextHeader }}</h1>
  </div>
</template>
