class UserService {
  async registerUser(user) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.error(`ERROR REGISTERING USER: ${error.message}`)
    }
  }
  async getUserByEmail(email) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users?email=${email}`
      )
      if (response.ok) {
        const users = await response.json()
        if (users.length > 0) {
          return users[0]
        }
      }
      throw new Error('User not found')
    } catch (error) {
      // console.error(`ERROR GETTING USER BY EMAIL: ${error.message}`);
      throw error
    }
  }
  async loginUser(email, password) {
    try {
      const user = await this.getUserByEmail(email)
      if (user.password === password) {
        return user
      } else {
        throw new Error('Incorrect password')
      }
    } catch (error) {
      // console.error(`ERROR LOGGING IN USER: ${error.message}`);
      throw error
    }
  }
  async getUserPlaylists(userId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/playlists/?${userId}`
      )

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.error(
        `ERROR FETCHING ALL ${item.toUpperCase()}: ${error.message}`
      )
    }
  }
}

export default UserService
