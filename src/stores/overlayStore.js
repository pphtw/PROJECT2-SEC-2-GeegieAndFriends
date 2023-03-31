import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useOverlayStore = defineStore('overlay', () => {
  const contextMenu = reactive({
    isOpen: false,
    show(e) {
      e.stopPropagation()
      this.isOpen = true
      position.x = e.clientX
      position.y = e.clientY
    },
    hide() {
      this.isOpen = false
    },
  })
  const position = reactive({
    x: 0,
    y: 0,
  })
  const openLoginOverlay = ref(false)
  const openPlaylistOverlay = ref(false)
  const overlayPlaylistId = ref(null)
  const openCreateOverlay = ref(false)

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

  const showCreateOverlay = () => {
    openCreateOverlay.value = true
  }
  const hideCreateOverlay = () => {
    openCreateOverlay.value = false
  }

  const toggleCreateOverlay = () => {
    openCreateOverlay.value = true
    openPlaylistOverlay.value = false
  }

  return {
    contextMenu,
    openPlaylistOverlay,
    position,
    openLoginOverlay,
    toggleLoginOverlay,
    showPlaylistOverlay,
    hidePlaylistOverlay,
    overlayPlaylistId,
    showCreateOverlay,
    hideCreateOverlay,
    openCreateOverlay,
    toggleCreateOverlay,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOverlayStore, import.meta.hot))
}
