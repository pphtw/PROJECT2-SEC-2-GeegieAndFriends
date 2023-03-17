<script setup>
defineProps({
  time: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
})
const getFontSize = (n = 1) => {
  switch (n) {
    case 1:
      return 'text-sm'
    case 2:
      return 'text-md'
    case 3:
      return 'text-lg'
    case 4:
      return 'text-xl'
  }
}
const getBoldness = (n = 1) => {
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
  <p class="px-2" :class="[getFontSize(size), getBoldness(weight)]">
    {{ time }}
  </p>
</template>
