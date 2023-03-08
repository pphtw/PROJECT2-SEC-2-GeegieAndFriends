<script setup>
defineProps({
  inputTextHeader: {
    type: String
  }
})
</script>

<template>
<div class="text-2xl font-bold pb-3 max-sm:hidden text-white truncate">
  <h1>{{ inputTextHeader }}</h1>
</div>
</template>

<style scoped>

</style>