<template>
    <div class="authors">
        <div class="authors-body">
            <div class="author-main" v-for="(item,index) in authors" :key="index">
                <div class="avator" v-if="item.user.avatar">
                    <img :src="'http://81.70.161.76:5000' + item.user.avatar" />
                </div>  
                <div class="user-info">
                    <div>
                        <span class="author-name">{{ item.user.username }}</span>
                    </div>
                    <div>
                        <span class="author-email">{{ item.user.email }}</span>
                    </div>
                    <div>
                        <span class="author-email author-grade">等级: {{ item.rank.toFixed(2)  }}</span>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'Authors',
    props:{
        authors:{
            type:Array,
            default:[]
        }
    }
}
</script>
<style lang="scss">
.authors{
    .authors-body{
        display: flex;
        flex-wrap: wrap;
    }
    .author-main{
        display: flex;
        align-items: center;
        flex: 0 0 50%;
        padding-bottom: 20px;
        
        .avator{
            width:80px;
            height: 100px;
            text-align: center;
            display: flex;
            align-items: center;
            img{
                width: 42px;
                height: 42px;
                border: 1px solid;
                vertical-align: middle;
            }
        }
        .user-info{
            flex: 1;
        }
    }
}

</style>