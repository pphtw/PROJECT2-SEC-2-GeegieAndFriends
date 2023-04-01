<script setup>
// Definition
const props = defineProps({
  contentStyle: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="w-full h-screen flex flex-row bg-[#162750]">
    <div
      class="container-gradient w-full h-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid"
      :class="contentStyle"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
