<script setup>
import {ref, onMounted} from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen gap-6 bg-pink-300">
    <div class='button w-40 h-16 bg-pink-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#cf3f86,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#cf3f86,0_15px_0_0_#1b70f841]
    border-b-[1px] border-pink-400'>
      <span @click="increment" class='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Count is: {{ count }}</span>
    </div>
  </div>

</template>

<style scoped></style>
