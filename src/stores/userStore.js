import {defineStore} from "pinia";
import {reactive} from "vue";
import UserService from "@/lib/userService";

export const useUserStore  = defineStore('user', {
    state: () => ({
        user: {
            firstName: '',
            listName: '',
            email: '',
            password: '',
        },
        message: '',
    }),
    actions: {
        async register(user) {
            const userService = new UserService();
            try {
                const registeredUser = await userService.registerUser(user);
                if (registeredUser) {
                    console.log('User registered:', registeredUser);
                    this.message = 'Registration successful!';
                    return true;
                }
            } catch (e) {
                console.error(`Error registering user: ${e.message}`);
                return false;
            }
        },
    },
});