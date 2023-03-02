<script setup></script>

<template>
  <div
    class="container-gradient max-sm:grow order-1 sm:order-2 w-full sm:w-[94.6%] h-fit sm:h-full gap-[4%] sm:px-[5%] sm:py-0 py-[5%] flex flex-col sm:justify-center justify-end"
  >
    <!-- #Header&Playlist -->
    <div class="h-fit sm:h-[28%] flex-col hidden sm:flex">
      <!-- #Header -->
      <div class="grid grid-cols-2 pb-3">
        <h1 class="text-2xl font-bold text-white col-start-1">Your Style</h1>
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
            @click="onChoosePlaylist"
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
  </div>
</template>

<style scoped></style>
