<template>
    <div class="button-wrapper">
        <button v-if="!isLoggedIn" type="button" class="google-btn" :class="{ notActive : isLogged}" @click="handleSignIn">
            Sign in with Google
        </button>
        <button type="button noback" v-if="userEmail" @click="handleSignOut">
            <!-- {{userEmail}} -->
            Sign Out
        </button>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import { useGlobalStore } from '../../stores/Global'
    export default {
        

    data() {
        return {
        userEmail: '',
        }
    },
    methods: {
        async handleSignIn() {
        try {
            const googleUser = await this.$gAuth.signIn();
            if (!googleUser) {
                return null;
            }
            this.userEmail = googleUser.getBasicProfile().getEmail();
            const global = useGlobalStore()
            global.name=googleUser.getBasicProfile().getName()
            global.email = this.userEmail
            global.isLoggedIn = true
            // const { isDark } = storeToRefs(themeStore);
            this.$router.push({ name: 'home' })

        } catch (error) {
            console.log(`Error : ${error}`);
            return null;
        }
        },
        async handleSignOut() {
        try {
            await this.$gAuth.signOut();
            this.userEmail = '';
            this.$router.push({ name: 'login' })
        } catch (error) {
            console.log(error);
        }
        }
    },

    setup() {
        const Vue3GoogleOauth = inject('Vue3GoogleOauth');

        return {
        Vue3GoogleOauth,
        };
    }
}
</script>

<style scoped>
.button-wrapper{
    display: flex;
    justify-content: flex-end;
}
    .button-wrapper button{
        min-width: 150px;
        cursor: pointer;
        display: inline;
        padding: 12px 16px 12px 42px;
        border: none;
        margin:5px ;
        border-radius: 3px;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
        color: #757575;
        font-size: 0.8em;
        font-weight: 500;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
        background-color: whitesmoke;
        background-repeat: no-repeat;
        background-position: 12px 11px;
    }

</style>
