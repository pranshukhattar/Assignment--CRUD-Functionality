
<template>
    <div class="wrapper">
      <Upload />
      <section class="list" v-for="file in files" :key="file">
        <List :file = file />
      </section>
    </div>
</template>

<script>
import { useGlobalStore } from '../stores/Global'
import Navbar from '../components/common/navbar.vue'
import Upload from '../components/homepage/upload.vue'
import List from '../components/homepage/list.vue'
    export default {
      data() {
        return {
          files : null
        }
      },
      components : { Navbar, Upload, List, },
      created() {
        const global = useGlobalStore()

        if (!global.isLoggedIn){
          this.$router.push({ path: '/' })
        }
        else{
          let url = 'http://localhost:5005/list' + `?email=${global.email}`;
          fetch(url, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.files = data.files;
          })
        }
      }
    }
</script>

<style scoped>
  .list{
    overflow-y: scroll;
  }
</style>