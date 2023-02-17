<template>
  <div class="about">
    <h1>You Are not Logged In: </h1>
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
  .about {
    margin: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .about h1{
    margin: 10px;
    font-size: 1.5em;
  }
</style>
