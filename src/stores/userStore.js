import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive } from 'vue'
export const useUserStore = defineStore('user', () => {
  const currentUser = reactive({})
  return{
    currentUser
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
