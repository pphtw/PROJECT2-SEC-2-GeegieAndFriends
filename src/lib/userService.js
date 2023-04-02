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
        return Promise.reject(response.statusText)
      }
    } catch (error) {
      console.error(`ERROR REGISTERING USER: ${error.message}`)
    }
  }
  async getUserByEmail(email) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users?email=${email.toLowerCase()}`
      )
      if (response.ok) {
        const users = await response.json()
        if (users.length > 0) {
          return users[0]
        }
      } else {
        return undefined
      }
    } catch (error) {
      // console.error(`ERROR GETTING USER BY EMAIL: ${error.message}`);
      throw error
    }
  }
  async getUserById(userId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users?id=${userId}`
      )
      if (response.ok) {
        const users = await response.json()
        if (users.length > 0) {
          return users[0]
        }
      } else {
        return Promise.reject(response.statusText)
      }
    } catch (error) {
      console.error(`ERROR GETTING USER BY ID: ${error.message}`)
      throw error
    }
  }
  async loginUser(email, password) {
    try {
      const user = await this.getUserByEmail(email.toLowerCase())
      if (user.password === password) {
        return user
      } else {
        return Promise.reject(user.statusText)
      }
    } catch (error) {
      // console.error(`ERROR LOGGING IN USER: ${error.message}`);
      throw error
    }
  }
  async getUserPlaylists(userId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/playlists?owner=${userId}`
      )

      if (response.ok) {
        return await response.json()
      } else {
        return Promise.reject(response.statusText)
      }
    } catch (error) {
      console.error(
        `ERROR FETCHING PLAYLIST OF USER ${userId}: ${error.message}`
      )
    }
  }
  async updateUserLikedTracks(userId, likedTrack) {
    const user = await this.getUserById(userId)
    const updatedUser = {
      ...user,
      likedTracks: likedTrack,
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedUser),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (response.ok) {
        return await response.json()
      } else {
        return Promise.reject(response.statusText)
      }
    } catch (error) {
      console.error(
        `ERROR UPDATING LIKED TRACKS OF USER ${userId}: ${error.message}`
      )
    }
  }

  async updateUserLikedPlaylist(userId, likedPlaylists) {
    const user = await this.getUserById(userId)
    const updatedUser = {
      ...user,
      likedPlaylists: likedPlaylists,
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedUser),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (response.ok) {
        return await response.json()
      } else {
        return Promise.reject(response.statusText)
      }
    } catch (error) {
      console.error(
        `ERROR UPDATING LIKED PLAYLISTS OF USER ${userId}: ${error.message}`
      )
    }
  }
}

export default UserService
