const registerManagement = () => {
  const userPattern = {
    firstName: /^[A-Za-z]+$/,
    lastName: /^[A-Za-z]+$/,
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

  const register = () => {}
  return { checkPattern }
}
export { registerManagement }
