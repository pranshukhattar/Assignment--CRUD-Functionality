<template>
  <div class="login-wrapper">
    <Signin />
  </div>
</template>

<script>
import Signin from '../components/common/Signin.vue'
export default {
  components: { Signin },
  
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
