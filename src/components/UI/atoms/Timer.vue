<script setup>
defineProps({
  time:{
    type: String,
    required: true
  },
  size:{
    type:Number,
    required: false
  }
})
const getFontSize = (n = 1) => {
  switch (n) {
    case 1 : return 'text-sm'
    case 2 : return 'text-md'
    case 3 : return 'text-lg'
    case 4 : return 'text-xl'
  }
}
</script>

<template>
    <p class="px-2" :class="getFontSize(size)">{{ time }}</p>
</template>

<style scoped>

</style>