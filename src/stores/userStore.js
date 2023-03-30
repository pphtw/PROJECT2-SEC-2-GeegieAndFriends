import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive } from 'vue'
export const useUserStore = defineStore('user', () => {
  const setUser = reactive({})
  return{
    setUser
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
