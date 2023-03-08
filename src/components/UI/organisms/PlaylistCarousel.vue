<script setup>
import { ref } from 'vue'
import PreviousPageButton from "@/components/UI/atoms/previousPageButton.vue";
import NextPageButton from "@/components/UI/atoms/NextPageButton.vue";
import metadata from '@/assets/metadata.json'

const playlistData = metadata.playlists
const playlistElement = ref(null)
defineEmits(['nextPageHandler','previousPageHandler'])
const nextPageHandler = () => {
  playlistElement.value.scrollLeft += 1400
}
const previousPageHandler = () => {
  playlistElement.value.scrollLeft -= 1400
}
</script>
<template>
<!--         #NextButton&PreviousButton -->
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
<!--  </div>-->
</template>