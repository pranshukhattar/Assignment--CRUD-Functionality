import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
        state: () => ({
            isLoggedIn: false,
            email: null,
        }),
        actions: {
            login(email) {
            this.email = email;
        },
        },
    })