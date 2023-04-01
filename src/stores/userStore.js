import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const currentUser = ref({})

  const setUser = (user) => {
    currentUser.value = user
  }

  const logout = () => {
    currentUser.value = {}
  }

  const checkUserLoggedIn = () => {
    return Object.keys(currentUser.value).length !== 0
  }
  return {
    currentUser,
    setUser,
    checkUserLoggedIn,
    logout,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
