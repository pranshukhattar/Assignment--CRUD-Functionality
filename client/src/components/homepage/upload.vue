<template>
  <div class="drag-area">
    <div class="icon"><i class="ri-upload-cloud-fill"></i></div>
    <header>Drag & Drop to Upload File</header>
    <span>OR</span>
    <span class="file-input">
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    </span>
    <button v-if="file" v-on:click="submitFile()">Submit</button>
    <h1>{{ global.email }} </h1>
  </div>
</template>

<script>
import { useGlobalStore } from '../../stores/Global';
export default {
  setup() {
    const global = useGlobalStore()
    return { global }
  },
  data() {
    return {
      file: '',
      curEmail : this.setup
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile() {
      
      const file = this.file
      const curEmail = this.curEmail
      const url = 'http://localhost:5005/upload';
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData)

      const postBody={
        "FormData": formData,
        "Email" : curEmail
      }
      console.log(this.curEmail)
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(postBody)
      });

      if (response.ok) {
        console.log(response)
        console.log(formData)
        this.$router.go(this.$router.currentRoute); //refresh page
      } else {
        console.error('Error uploading file');
      }
    }
    },
  }
</script>

<style scoped>
.drag-area {
  margin: auto;
  padding: 10px;
  border: 2px dashed #fff;
  width: 500px;
  max-width: 80vw;
  min-height: 40vh;
  height: 310px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.drag-area .active {
  border: 2px solid #fff;
}
.drag-area .icon {
  font-size: 80px;
  color: #fff;
}
.drag-area header {
  text-align: center;
  font-size: 1em;
  font-weight: 500;
  color: #fff;
}
.drag-area span {
  font-size: 1em;
  font-weight: 500;
  color: #fff;
  /* margin: 10px 0 15px 0; */
}
.drag-area button {
  margin: 10px;
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  border: none;
  outline: none;
  background: #ffffff;
  color: #5256ad;
  border-radius: 5px;
  cursor: pointer;
}
input[type= "file"]{
  display: inline-block;
  width: 80%;
  /* margin: 1rem; */
}
.file-input{
  display: flex;
  justify-content: center;
  /* background-color: aqua; */
}
.file-label{
  cursor: pointer;
  margin: 10px;
  padding: 5px;
  font-size: 1.5em;
  color: #5256ad;
  background-color: whitesmoke;
  border-radius: 5px;
  /* margin: 5rem; */
}
/* .drag-area img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
    } */
</style>

// dropArea.classList.add("active"); // this.displayFile(dropArea); //
dropArea.addEventListener("dragover", (event)=>{ // event.preventDefault();
//preventing from default behaviour // dropArea.classList.add("active"); //
dragText.textContent = "Release to Upload File"; // }); //
dropArea.addEventListener("dragleave", ()=>{ //
dropArea.classList.remove("active"); // dragText.textContent = "Drag & Drop to
Upload File"; // }); // dropArea.addEventListener("drop", (event)=>{ //
event.preventDefault(); //preventing from default behaviour // //getting user
select file and [0] this means if user select multiple files then we'll select
only the first one // file = event.dataTransfer.files[0]; // });
