<template>
    <div class="authors">
        <div class="authors-body">
            <div v-for="(author,index) in authors" v-bind:key="index">
                <div>
                    <img src="" alt="">
                </div>
                <div>
                    <span class="author-name"></span>
                </div>
                <div>
                    <span class="author-email"></span>
                </div>
                <el-divider v-if="index < authors.length - 1"></el-divider>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'Authors',
    props:['authors'],
    data(){
        return {
            id:''
        }
    }

}
</script>