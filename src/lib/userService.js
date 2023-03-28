const API_URL = 'http://localhost:5000';

class UserService {

    async registerUser(user) {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(`ERROR REGISTERING USER: ${error.message}`);
        }
    }
}

export default UserService;