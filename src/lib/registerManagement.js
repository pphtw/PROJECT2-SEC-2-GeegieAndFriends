const registerManagement = () => {
  const userPattern = {
    firstName: /^[A-Za-z]+$/,
    lastName: /^[A-Za-z]+$/,
    email: /.+@([a-zA-Z0-9\-]+)\.com/,
    password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{7,})/,
  }
  const validateFirstName = (firstName) => {
    if (!userPattern.firstName.test(firstName)) {
      return 'First name should only contain letters.'
    }
    return ''
  }
  const validateLastName = (lastName) => {
    if (!userPattern.lastName.test(lastName)) {
      return 'Last name should only contain letters.'
    }
    return ''
  }
  const validateEmail = (email) => {
    if (!userPattern.email.test(email)) {
      return 'Email enter a valid email (eg. Geegie@example.com).'
    }
    return ''
  }
  const validatePassword = (password) => {
    if (!userPattern.password.test(password)) {
      let errorMessage = 'Password must:'
      if (!/(?=.*[a-z])/.test(password)) {
        errorMessage = '\n- Contain at least one lowercase letter'
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessage = '\n- Contain at least one uppercase letter'
      }
      if (!/(?=.*[0-9])/.test(password)) {
        errorMessage = '\n- Contain at least one number'
      }
      if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
        errorMessage = '\n- Contain at least one special character'
      }
      if (!/(?=.{7,})/.test(password)) {
        errorMessage = '\n- Be at least 7 characters long'
      }
      return errorMessage
    }
    return ''
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

  const clearRegisterBox = (user) => {
    user.firstName = ''
    user.lastName = ''
    user.email = ''
    user.password = ''
  }
  return {
    checkPattern,
    clearRegisterBox,
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
  }
}
export { registerManagement }
