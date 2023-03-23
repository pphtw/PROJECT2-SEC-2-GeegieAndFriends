<script setup>
defineProps({
  inputTextHeader: {
    type: String,
  },
})
</script>

<template>
  <div class="text-2xl font-bold text-white truncate w-fit">
    <h1>{{ inputTextHeader }}</h1>
  </div>
</template>
