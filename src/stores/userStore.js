import { acceptHMRUpdate, defineStore } from 'pinia'
import UserService from '@/lib/userService'
import { ref } from 'vue'
import { useControllerStore } from '@/stores/controllerStore'

export const useUserStore = defineStore('user', () => {
  const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const userLogin = {
    email: '',
    password: ''
  }
  const userPattern = {
    firstName: /[a-zA-z]+/,
    lastName: /[a-zA-z]+/,
    email: /.+@([a-zA-Z0-9\-]+)\.com/,
    password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
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

  const message = ref('')
  const isRegistered = ref(false)
  const isLoggedIn = ref(false)

  const register = async (user) => {
    const userService = new UserService()
    try {
      if (
        (!checkPattern(user, 'firstName') ||
          !checkPattern(user, 'lastName') ||
          !checkPattern(user, 'email'),
        !checkPattern(user, 'password'))
      ) {
        message.value = 'Please check your information!'
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
  const login = async (userLogin) => {
    const userService = new UserService()
    try {
      const loggedInUser = await userService.loginUser(
        userLogin.email,
        userLogin.password
      )
      if (loggedInUser) {
        console.log('User logged in: ', loggedInUser)
        isLoggedIn.value = true
        message.value = 'Login successful'
      }
    } catch (error) {
      console.error(`Error logging in user: ${error.message}`)
      isLoggedIn.value = false
      message.value = 'Invalid email or password'
    }
  };
  return { user, message, register, isRegistered,login,userLogin,isLoggedIn,checkPattern }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
