import { defineStore } from 'pinia'
import UserService from '@/lib/userService'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = {
    firstName: '',
    listName: '',
    email: '',
    password: '',
  }
  const message = ref('')

  const register = async (user) => {
    const userService = new UserService()
    try {
      const registeredUser = await userService.registerUser(user)
      if (registeredUser) {
        console.log('User registered:', registeredUser)
        this.message = 'Registration successful!'
        return true
      }
    } catch (e) {
      console.error(`Error registering user: ${e.message}`)
      return false
    }
  }
  return { user, message, register }
})
