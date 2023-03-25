<script setup>
import {inject} from "vue";
import Timer from "@/components/UI/atoms/Timer.vue";
import ProgressBar from "@/components/UI/atoms/ProgressBar.vue";
const audioElement = inject('audioElement',new Audio())
const time = inject('time')
</script>

<template>
  <ProgressBar :audio-element="audioElement" />
  <div>
    <div class="flex justify-between w-full items-center">
      <Timer :time="time.currentTime" />
      <Timer :time="time.duration" />
    </div>
  </div>
</template>

<style scoped>

</style>
