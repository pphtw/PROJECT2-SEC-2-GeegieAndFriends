import { acceptHMRUpdate, defineStore } from 'pinia'
import UserService from '@/lib/userService'
import { reactive, ref } from 'vue'
const hashPassword = async (password) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
export const useUserStore = defineStore('user', () => {
  const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const userPattern = {
    firstName: /[a-zA-z]+/,
    lastName: /[a-zA-z]+/,
    email: /.+@([a-zA-Z0-9\-]+)\.com/,
    password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{7,})/,
  }

  const checkPattern = (user, type) => {
    return type === 'firstName'
      ? userPattern.firstName.test(user.firstName)
      : type === 'lastName'
      ? userPattern.lastName.test(user.lastName)
      : type === 'email'
      ? userPattern.email.test(user.email)
      : type === 'password'
      ? userPattern.password.test(user.password)
      : false
  }
  const state = reactive({
    register: {
      message: '',
    },
    login: {
      message: '',
    },
  })
  const isRegistered = ref(false)
  const isLoggedIn = ref(false)

  const register = async (user) => {
    const userService = new UserService()
    try {
      if (
        !checkPattern(user, 'firstName') ||
        !checkPattern(user, 'lastName') ||
        !checkPattern(user, 'email') ||
        !checkPattern(user, 'password')
      ) {
        state.register.message = 'Please check your information!'
        isRegistered.value = false
      } else {
        const hashedPassword = await hashPassword(user.password)
        const registeredUser = await userService.registerUser({
          ...user,
          password: hashedPassword,
        })
        if (registeredUser) {
          state.register.message = 'Registration successful!'
          isRegistered.value = true
        }
      }
    } catch (e) {
      console.error(`Error registering user: ${e.message}`)
      isRegistered.value = false
    }
  }
  const login = async (userLogin) => {
    const userService = new UserService()
    try {
      const hashedPassword = await hashPassword(userLogin.password)
      const loggedInUser = await userService.loginUser(
        userLogin.email,
        hashedPassword
      )
      if (loggedInUser) {
        isLoggedIn.value = true
        state.login.message = 'Login successful'
      }
    } catch (error) {
      isLoggedIn.value = false
      state.login.message = 'Invalid email or password'
    }
  }
  return {
    user,
    state,
    isRegistered,
    userLogin,
    isLoggedIn,
    register,
    login,
    checkPattern,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
