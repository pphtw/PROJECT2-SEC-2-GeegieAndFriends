import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useOverlayStore = defineStore('overlay', () => {
  const openContextMenu = ref(false)
  const openLoginOverlay = ref(false)
  const position = reactive({
    x: 0,
    y: 0,
  })

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

  return {
    openContextMenu,
    showContextMenu,
    position,
    openLoginOverlay,
    toggleLoginOverlay,
    hideContextMenu,
  }
})
