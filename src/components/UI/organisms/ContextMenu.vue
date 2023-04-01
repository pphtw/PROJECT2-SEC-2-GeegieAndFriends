<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from '@/stores/playlistStore'

const playlistStore = usePlaylistStore()
const overlayStore = useOverlayStore()

const { addToFavorites, checkFavorites } = playlistStore

const { contextMenu, position } = storeToRefs(overlayStore)
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="contextMenu.isOpen"
        class="absolute block z-[999]"
        :style="{ top: position.y + 'px', left: position.x + 'px' }"
      >
        <div
          class="bg-[#162750]/[98%] w-60 rounded-lg flex flex-col text-sm py-1 px-1 text-gray-500 shadow-lg"
        >
          <div v-if="contextMenu.context === 'track'">
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Add to queue</div>
            </div>
            <hr class="my-2 border-gray-300" />
            <div
              class="flex hover:bg-gray-50 py-2 px-2 rounded"
              @click="addToFavorites(Number(contextMenu.targetId))"
            >
              <div v-if="checkFavorites(Number(contextMenu.targetId))">
                Remove from your Liked Songs
              </div>
              <div v-else>Save to your Liked Songs</div>
            </div>
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Add to playlist</div>
            </div>
            <hr class="my-2 border-gray-300" />
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Copy Song Link</div>
            </div>
          </div>
          <div v-else-if="contextMenu.context === 'playlist'">
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Add to queue</div>
            </div>
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Open Playlist</div>
            </div>
            <hr class="my-2 border-gray-300" />
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Remove from Your Library</div>
              <div>Add to Your Library</div>
            </div>
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Add to other playlist</div>
            </div>
            <hr class="my-2 border-gray-300" />
            <div class="flex hover:bg-gray-50 py-2 px-2 rounded">
              <div>Copy link to playlist</div>
            </div>
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
