<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'

const overlayStore = useOverlayStore()

const { contextMenu, position } = storeToRefs(overlayStore)
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="contextMenu.isOpen"
        class="absolute block z-auto"
        :style="{ top: position.y + 'px', left: position.x + 'px' }"
      >
        <div
          class="bg-[#162750]/[98%] w-60 rounded-lg flex flex-col text-sm py-1 px-1 text-gray-500 shadow-lg"
        >
          <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
            <div>Add to queue</div>
          </div>
          <hr class="my-2 border-gray-300" />
          <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
            <div>Save to your Liked Songs</div>
          </div>
          <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
            <div>Add to playlist</div>
          </div>
          <hr class="my-2 border-gray-300" />
          <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
            <div>Copy Song Link</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
