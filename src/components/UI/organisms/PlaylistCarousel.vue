<script setup>
import { ref } from 'vue'
import metadata from '@/assets/metadata.json'
const playlistData = metadata.playlists

import PreviousPageHandler from '@/components/UI/atoms/previousPageHandler.vue'
import NextPageHandler from '@/components/UI/atoms/NextPageHandler.vue'
import SectionHeader from "@/components/UI/atoms/SectionHeader.vue";

const playlistElement = ref(null)
const nextPageHandler = () => {
  playlistElement.value.scrollLeft += 1400
}
const previousPageHandler = () => {
  playlistElement.value.scrollLeft -= 1400
}
</script>
<template>
  <div class="h-fit sm:h-[28%] flex-col hidden sm:flex">
    <!-- #Header -->
    <div class="grid grid-cols-2 pb-3">
      <SectionHeader input-text-header="Your Style"/>
      <div class="col-span-1 flex justify-end gap-2">
        <!-- #NextButton&PreviousButton -->
        <PreviousPageHandler @click="previousPageHandler" />
        <NextPageHandler @click="nextPageHandler" />
      </div>
    </div>
    <!-- #Playlist -->
    <div
        class="grow relative h-fit overflow-x-auto scroll-smooth no-scrollbar-full"
        ref="playlistElement"
    >
      <div class="h-full inline-flex gap-10 justify-start">
        <div
            v-for="playlist in playlistData"
            :style="{
            backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
          }"
            :key="playlist['playlistId']"
            :id="playlist['playlistId']"
            @click="$emit('click-playlist', $event.currentTarget.id)"
            class="flex justify-center w-[20rem] cursor-pointer bg-blue-500 rounded-2xl hover:bg-blue-400 bg-cover"
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
  </div>
</template>