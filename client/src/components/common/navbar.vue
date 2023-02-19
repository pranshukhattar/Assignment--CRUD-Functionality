<template>
    <div class="nav-wrapper">
            <SignIn />
        <span>
            Hi, {{ name }}
        </span>
    </div>
</template>

<script>
import SignIn from '../common/Signin.vue'
    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {
            SignIn,
        },
    }
</script>
<style scoped>
.wrapper{
    width: 500px;
    height: 10em;
    /* max-height: 5em; */
}
  .wrapper span{
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 2em;
    padding: 0;
    text-align: center;
    margin-bottom: 0.5em;
    border: 1px solid white;
    border-radius: 5px;
  }
</style>