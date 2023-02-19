<template>
    <div class="nav-wrapper">
        <span>
            Hi, {{ user_name }}
        </span>
            <SignIn />
    </div>
</template>

<script>
import { useGlobalStore } from '../../stores/Global'
import SignIn from '../common/Signin.vue'
    export default {
        data() {
            return {
                user_name: ''
            }
        },
        setup() {
            const global = useGlobalStore()
            // this.user_name = global.name
        },
        components: {
            SignIn,
        },
    }
</script>
<style scoped>
.nav-wrapper{
    margin:0.5em 0;
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-wrapper span{
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 2em;
    padding: 0.5em;
}
</style>