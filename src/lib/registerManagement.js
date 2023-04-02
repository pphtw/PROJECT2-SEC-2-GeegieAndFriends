const registerManagement = () => {
  const userPattern = {
    firstName: /^[A-Za-z]+$/,
    lastName: /^[A-Za-z]+$/,
    email: /.+@([a-zA-Z0-9\-]+)\.com/,
    password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{7,})/,
  }
  const getNameValidationMessage = (name, fieldName) => {
    if (name === '') {
      return `Please check your ${fieldName}!`;
    }
    if (!userPattern.name.test(name)) {
      return `${fieldName} should only contain letters.`;
    }
    return '';
  };
  const getEmailValidationMessage = (email) => {
    if (email === '') {
      return 'Please check your email';
    }
    if (!userPattern.email.test(email)) {
      return 'Please enter a valid email (e.g. geegie@example.com).';
    }
    return '';
  };
  const getPasswordValidationMessage = (password) => {
    if (password === ''){
      return 'Please check your password';
    }
    if (!/(?=.*[a-z])/.test(password) && !/(?=.*[A-Z])/.test(password) && !/(?=.*[0-9])/.test(password) && !/(?=.*[^A-Za-z0-9])/.test(password) && !/(?=.{7,})/.test(password)) {
      return 'Please check your password';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/(?=.*[0-9])/.test(password)) {
      return 'Password must contain at least one digit.';
    }
    if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    if (!/(?=.{7,})/.test(password)) {
      return 'Password must be at least 7 characters long.';
    }

    return '';
  };
  const checkPattern = (user, type) => {
    const pattern = userPattern[type];
    return pattern ? pattern.test(user[type]) : false;
  };

  const clearRegisterBox = (user) => {
    user.firstName = ''
    user.lastName = ''
    user.email = ''
    user.password = ''
    user.likedTracks = []
  }
  return {
    checkPattern,
    clearRegisterBox,
    getEmailValidationMessage,
    getNameValidationMessage,
    getPasswordValidationMessage
  }
}
export { registerManagement }
