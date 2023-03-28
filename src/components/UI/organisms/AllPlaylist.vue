<script setup>
import { getFilteredItemList, getAllItems } from '@/lib/getData'
import { onMounted, ref } from 'vue'

const props = defineProps({
  playlists: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="min-h-0 overflow-y-scroll">
    <div class="h-fit grid grid-cols-6 gap-x-6 gap-y-3">
      <div
        class="flex justify-center cursor-pointer h-full aspect-square hover:opacity-80 bg-cover rounded-xl my-auto"
        v-for="playlist in playlists"
        :key="playlist.id"
        :id="playlist.id"
        :style="{
          backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
        }"
        tabindex="-1"
      >
        <p
          class="text-white truncate text-lg font-semibold self-center text-center"
        >
          {{ playlist.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
