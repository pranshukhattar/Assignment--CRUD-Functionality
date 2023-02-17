
<template>
    <div class="wrapper">
      <Navbar />
      <!-- <h1 >Is Initialized : {{ Vue3GoogleOauth.isInit }}</h1> -->
      <Upload />
      <List />
    </div>
</template>

<script>
import Navbar from '../components/common/navbar.vue'
import Upload from '../components/homepage/upload.vue'
import List from '../components/homepage/list.vue'
    export default {
      components : {
        Navbar,
        Upload,
        List,
        },
    }
</script>

<style scoped>
  
</style>