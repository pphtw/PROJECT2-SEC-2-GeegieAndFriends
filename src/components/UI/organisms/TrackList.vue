<script setup>
import SingleTrack from './SingleTrack.vue'
import { useControllerStore } from '@/stores/controllerStore'
import { storeToRefs } from 'pinia'
import { useOverlayStore } from '@/stores/overlayStore'
import { ref } from 'vue'

// Use Store
const controllerStore = useControllerStore()
const overlayStore = useOverlayStore()

const { currentTrack } = storeToRefs(controllerStore)
const { contextMenu } = overlayStore

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
  selectedTrack: {
    type: Array,
    required: false,
  },
  draggable: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const emits = defineEmits(['moveTrack', 'chooseTrack'])

const trackElements = ref(null)
const onDragStart = (e, i) => {
  e.dataTransfer.setData('tracks/index', i)
  e.dataTransfer.effectAllowed = 'move'
}

const onDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

const onDrop = (event, targetIndex) => {
  const domRect = trackElements.value[targetIndex].getBoundingClientRect()
  const movingIndex = Number(event.dataTransfer.getData('tracks/index'))
  const isDroppingBelowTarget = event.clientY > domRect.top + domRect.height / 2
  emits('moveTrack', event, movingIndex, targetIndex, isDroppingBelowTarget)
}
</script>

<template>
  <TransitionGroup
    tag="div"
    name="list"
    class="rounded-sm no-scrollbar h-full scroll-smooth overflow-x-hidden"
    :class="[contextMenu.isOpen ? 'overflow-y-hidden' : 'overflow-y-scroll']"
    @contextmenu.prevent
  >
    <!-- #TrackList -->
    <div
      class="no-select selection:cursor-default flex items-center h-20 hover:bg-[#FFFFFF]/30 rounded-sm overflow-clip cursor-pointer"
      v-for="(track, index) in trackList"
      :key="track.id"
      :id="track.id"
      :class="{
        'is-playing': currentTrack.id === track.id,
      }"
      ref="trackElements"
      :draggable="draggable"
      @dragstart="onDragStart($event, index)"
      @dragover="onDragOver"
      @drop="onDrop($event, index)"
      @click="$emit('chooseTrack', $event, playlistId)"
      @contextmenu.prevent="contextMenu.show($event, 'track')"
    >
      <!-- #Ranking -->
      <div class="w-fit">
        <h1 class="text-center font-bold w-12 text-white">
          {{ index + 1 }}
        </h1>
      </div>
      <SingleTrack :track="track" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.is-choosing,
.is-choosing:hover {
  background-color: red;
}
.is-playing,
.is-playing:hover {
  background: rgba(220, 188, 238, 80%);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.no-select {
  user-select: none;
}
</style>
