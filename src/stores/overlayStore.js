import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useOverlayStore = defineStore('overlay', () => {
  const contextMenu = reactive({
    context: '',
    targetId: null,
    isOpen: false,
    show(e, context) {
      e.stopPropagation()
      this.targetId = e.currentTarget.id
      this.context = context
      this.isOpen = true
      position.x = e.clientX
      position.y = e.clientY
      console.log(this.context)
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
  const openUpdateOverlay = ref(false)

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

  const showUpdateOverlay = () => {
    openUpdateOverlay.value = true
  }

  const hideUpdateOverlay = () => {
    openUpdateOverlay.value = false
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
    openUpdateOverlay,
    showUpdateOverlay,
    hideUpdateOverlay,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOverlayStore, import.meta.hot))
}
