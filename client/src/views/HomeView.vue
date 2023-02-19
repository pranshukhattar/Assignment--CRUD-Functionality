<template>
    <div class="wrapper">
      <div class="nav">
        <!-- <Navbar /> -->
      </div>
      <Upload />
      <div class="list_section" >
        <section class="list" v-for="file in files" :key="file" >
          <List :file = file />
        </section>
      </div>
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
          this.$router.push({ name: 'login' })
        }
        else{
          let url = 'http://localhost:5005/' + `?email=${global.email}`;
          fetch(url, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(data => {
            const sorted_files = data.files
            this.files = sorted_files.sort((a,b) => {
              return b.fileId - a.fileId
            });
          })
        }
      }
    }
</script>

<style scoped>
.nav{
  position: relative;
  z-index: 2;
  /* width: 100vh; */
  left: 0;
}
.list_section{
  transition: 200ms ease;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
  scrollbar-width: none;
}
</style>