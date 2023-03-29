import {acceptHMRUpdate, defineStore} from 'pinia'
import { reactive, ref } from 'vue'
import {useControllerStore} from "@/stores/controllerStore";

export const useOverlayStore = defineStore('overlay', () => {
  const openContextMenu = ref(false)
  const position = reactive({
    x: 0,
    y: 0,
  })
  const openLoginOverlay = ref(false)
  const openPlaylistOverlay = ref(false)
  const overlayPlaylistId = ref(null)

  const showContextMenu = (e) => {
    e.stopPropagation()
    openContextMenu.value = true
    position.x = e.clientX
    position.y = e.clientY
  }

  const hideContextMenu = (e) => {
    openContextMenu.value = false
  }

  const toggleLoginOverlay = () => {
    openLoginOverlay.value = !openLoginOverlay.value
  }
  const showPlaylistOverlay = (e) => {
    openPlaylistOverlay.value = true
    overlayPlaylistId.value = Number(e.currentTarget.id)
  }

  const hidePlaylistOverlay = () => {
    openPlaylistOverlay.value = false
  }

  return {
    openContextMenu,
    showContextMenu,
    openPlaylistOverlay,
    position,
    openLoginOverlay,
    toggleLoginOverlay,
    hideContextMenu,
    showPlaylistOverlay,
    hidePlaylistOverlay,
    overlayPlaylistId,
  }
})
if (import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useOverlayStore,import.meta.hot))
}
