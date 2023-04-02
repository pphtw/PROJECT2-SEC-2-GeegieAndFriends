import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

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
    },
    hide() {
      this.isOpen = false
    },
  })
  const position = reactive({
    x: 0,
    y: 0,
  })
  const isUpdate = ref(false)
  const openLoginOverlay = ref(false)
  const openPlaylistOverlay = ref(false)
  const overlayPlaylistId = ref(null)
  const openCreateOverlay = ref(false)
  const openUpdateOverlay = ref(false)

  const toggleLoginOverlay = () => {
    openLoginOverlay.value = !openLoginOverlay.value
  }

  const playlistOverlay = reactive({
    isOpen: false,
    playlist: null,
    show(playlist) {
      overlayPlaylistId.value = Number(playlist.id)
      playlistOverlay.isOpen = true
      playlistOverlay.playlist = playlist
    },
    hide() {
      playlistOverlay.isOpen = false
      playlistOverlay.playlist = null
    },
  })

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
    isUpdate.value = false
  }

  const contributionOverlay = reactive({
    isOpen: false,
    contributor: '',
    getData: computed(() => {
      switch (this.contributor) {
        case 'New': {
          return []
        }
        case 'Gee': {
          return []
        }
        case 'Poom': {
          return []
        }
        case 'Pream': {
          return []
        }
        case 'Ploy': {
          return []
        }
      }
    }),
    show(e, contributor) {
      e.stopPropagation()
      contributionOverlay.contributor = contributor
      contributionOverlay.isOpen = true
    },
    hide() {
      contributionOverlay.isOpen = false
    },
  })

  return {
    isUpdate,
    contextMenu,
    openPlaylistOverlay,
    position,
    openLoginOverlay,
    toggleLoginOverlay,
    overlayPlaylistId,
    showCreateOverlay,
    hideCreateOverlay,
    openCreateOverlay,
    openUpdateOverlay,
    showUpdateOverlay,
    hideUpdateOverlay,
    contributionOverlay,
    playlistOverlay,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOverlayStore, import.meta.hot))
}
