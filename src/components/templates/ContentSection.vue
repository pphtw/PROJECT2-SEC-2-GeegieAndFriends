<script setup>
const props = defineProps({
  width: {
    type: String,
    required: false,
    default: 'full',
  },
})
</script>

<template>
  <div class="h-full bg-gray-500 flex flex-col gap-4" :class="'w-' + width">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>
