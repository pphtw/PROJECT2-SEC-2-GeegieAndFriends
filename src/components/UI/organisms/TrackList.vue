<script setup>
import SingleTrack from './SingleTrack.vue'
import { useControllerStore } from '@/stores/controllerStore'
import { storeToRefs } from 'pinia'
import { useOverlayStore } from '@/stores/overlayStore'
// Use Store
const controllerStore = useControllerStore()
const overlayStore = useOverlayStore()

const { currentTrack } = storeToRefs(controllerStore)
const { showContextMenu } = overlayStore
const props = defineProps({
  trackList: {
    type: [Array, Object],
    required: false,
  },
  playlistId: {
    type: Number,
    required: false,
    default: 0,
  },
})
</script>

<template>
  <TransitionGroup
    tag="div"
    name="list"
    class="rounded-2xl no-scrollbar h-full scroll-smooth overflow-y-scroll overflow-x-hidden relative"
    @contextmenu.prevent
  >
    <!-- #TrackList -->
    <div
      class="flex items-center mb-1 h-20 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
      v-for="(track, index) in trackList"
      :key="track.id"
      :id="track.id"
      :class="{
        'is-playing': currentTrack.id === track.id,
      }"
      @mousedown="$event.preventDefault()"
      @click="$emit('chooseTrack', $event, playlistId)"
      @contextmenu.prevent="showContextMenu"
    >
      <!-- #Ranking -->
      <div class="w-fit">
        <h1 class="text-center font-bold w-12">
          {{ index + 1 }}
        </h1>
      </div>
      <SingleTrack :track="track" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.is-playing,
.is-playing:hover {
  background-color: #eedff6;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease-in-out;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30%);
}

.list-leave-active {
  position: absolute;
}

.list-leave-active,
.list-leave-to {
  opacity: 0;
  width: 100%;
}
</style>
