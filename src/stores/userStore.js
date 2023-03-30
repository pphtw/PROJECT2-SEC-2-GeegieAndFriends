import { acceptHMRUpdate, defineStore } from 'pinia'
import UserService from '@/lib/userService'
import { reactive } from 'vue'
import { hashPassword } from '@/lib/util'
export const useUserStore = defineStore('user', () => {
  const setUser = reactive({})
  return{
    setUser
  }

})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
