import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
        state: () => ({
            isLoggedIn: false,
            email: null,
            // isLoggedIn: true,
            // email: "const global = useGlobalStore()",
        }),
    })
