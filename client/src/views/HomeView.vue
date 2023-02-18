
<template>
    <div class="wrapper">
      <!-- <Navbar /> -->
      <!-- <h1 >Is Initialized : {{ Vue3GoogleOauth.isInit }}</h1> -->
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
          files:[],
          curEmail: "fghjkvbh@email"
        }
      },
      components : {
        Navbar,
        Upload,
        List,
        },
        // setup(props) {
        //     const global = useGlobalStore()

        // },
      mounted() {
        const global = useGlobalStore()
        // console.log('Global Variable',global.isLoggedIn)

        if (!global.isLoggedIn){
          this.$router.push({ path: '/' })
        }
        else{
          const url = 'http://localhost:5005/list';
          fetch(url, {
            method: 'GET',
          })
          .then(response => response.json())
          .then(data => {
            // console.log(data.users[this.curEmail].files)
            this.files = data.users[this.curEmail].files
            // console.log('HomeView User data',this.files)
            return data
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