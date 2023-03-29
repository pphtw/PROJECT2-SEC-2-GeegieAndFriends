import { defineStore } from 'pinia'
import UserService from '@/lib/userService'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const message = ref('')
  const isRegistered = ref(false)

  const register = async (user) => {
    const userService = new UserService()
    try {
      if (Object.values(user).filter((e) => e).length === 0) {
        message.value = 'Please insert your information!'
        isRegistered.value = false
      } else {
        const registeredUser = await userService.registerUser(user)
        if (registeredUser) {
          console.log('User registered:', registeredUser)
          message.value = 'Registration successful!'
          isRegistered.value = true
        }
      }
    } catch (e) {
      console.error(`Error registering user: ${e.message}`)
      isRegistered.value = false
    }
  }
  return { user, message, register, isRegistered }
})
