<template>
<div class="wrapper">
    <section class="empty" v-if="!file">
        No File Available
    </section>
    <section class="uploaded-area">
        <li class="row">
            <div class="content">
                <i class="ri-file-3-fill icon"></i>
                    <div class="details">
                        <a :href="file.url">
                            <span class="name">
                                    {{ file.fileName }}
                            </span>
                        </a>
                        <span class="size">{{ size }}</span>
                    </div>
            </div>
            <a :href="file.url">
                <i class="ri-download-2-fill"></i>
            </a>
            <a href="#">
                <i class="ri-delete-bin-2-fill icon" @click="deleteFile"></i>
            </a>
        </li>
    </section>
</div>
</template>

<script>
import { useGlobalStore } from '../../stores/Global';
    export default {
        props: ["file"],
        components : {
        },
        methods: {
            deleteFile(){
                const global = useGlobalStore()
                let url = 'http://localhost:5005/' + `?email=${global.email}&file_id=${this.file.fileId}`;
                fetch(url,{
                    method : "DELETE",
                })
                .then(response => {
                    if(response.ok)
                        this.$router.go()
                })
            }
        },
        created() {
            console.log("LIst Create",this.file)
        },
    }
</script>

<style scoped>
    .wrapper{
        max-width: 500px;
        color: var(--main);
        /* overflow: hidden */
        /* background: #000; */
        transition: 300ms ease;
    }
    section .row{
        margin: 15px 0 0;
        background: #d5d5d5;
        list-style: none;
        padding: 15px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    section .row i{
        color: var(--main);
        font-size: 25px;
        margin: 5px;
    }
    section .details .name{
        /* background: #404040; */
        font-size: 14px;
    }
    .uploaded-area{
        max-height: 230px;
        scrollbar-width: none;
        overflow: hidden;
        overflow-y: hidden;
    }

    .uploaded-area::-webkit-scrollbar{
        width: 0px;
    }
    .uploaded-area .row .content{
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 80%;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .uploaded-area .row .details{
        display: flex;
        margin-left: 15px;
        flex-direction: column;
    }
    .uploaded-area .row .details .size{
        color: #404040;
        font-size: 11px;
    }
    .uploaded-area i{
        font-size: 1em;
    }

    .icon{
        cursor: pointer;
    }
    .empty{
        margin: 30px 0;
        font-size: 20px;
        color: #404040;
        text-align: center;
        border: 2px solid #404040;
        border-radius: 5px;
    }
</style>