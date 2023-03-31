import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const currentUser = ref({})

  const setUser = (user) => {
    currentUser.value = user
  }
  return {
    currentUser,
    setUser
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
