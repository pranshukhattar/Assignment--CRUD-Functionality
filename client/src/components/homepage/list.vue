<template>
<div class="wrapper">
    <section class="uploaded-area">
        <li class="row">
            <div class="content">
            <i class="ri-file-3-fill"></i>
                <div class="details">
                    <span class="name">
                        <a :href="file.url">
                            {{ file.fileName }}
                        </a>
                    </span>
                    <span class="size">{{ size }}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress">
                    </div>
                </div>
            </div>
        </li>
    </section>
</div>
</template>

<script>
import { useGlobalStore } from '../../stores/Global'
    export default {
        props: ["file"],
        setup(props) {
            const global = useGlobalStore()
        },
        components : {
        }
    }
</script>

<style scoped>
    .wrapper{
        max-width: 500px;
        color: var(--main);
        overflow: hidden
        /* background: #fff; */
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
        font-size: 30px;
    }
    section .details span{
        font-size: 14px;
    }
    .uploaded-area{
        max-height: 230px;
        /* overflow-y: scroll; */
    }
    .uploaded-area .onprogress{
        max-height: 150px;
    }
    .uploaded-area::-webkit-scrollbar{
        width: 0px;
    }
    .uploaded-area .row{
        cursor: pointer;
    }
    .uploaded-area .row .content{
        display: flex;
        align-items: center;
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
</style>