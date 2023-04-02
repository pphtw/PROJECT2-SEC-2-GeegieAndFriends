<script setup>
defineProps({
  fontWeight: {
    type: Number,
    required: false,
  },
  textSize: {
    type: String,
    required: false,
  },
})

const setTextSize = (n) => {
  switch (n) {
    case 'lg':
      return 'text-lg'
    case 'xl':
      return 'text-xl'
    default:
      return 'text-base'
  }
}
const setFontWeight = (n = 1) => {
  switch (n) {
    case 1:
      return 'font-normal'

    case 2:
      return 'font-semibold'
    case 3:
      return 'font-bold'
  }
}
</script>

<template>
  <h1
    :class="[setFontWeight(fontWeight), setTextSize(textSize)]"
    class="row-span-1 truncate"
  >
    <slot />
  </h1>
</template>

<style scoped></style>
