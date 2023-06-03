<template>
    <div class="authors">
        <div class="authors-body">
            <div class="author-main" v-for="(item,index) in Areas" :key="index">
                <div class="user-info">
                    <div>
                        <span class="author-name">{{ item.area.name }}</span>
                    </div>
                    <div>
                        <span class="author-email">领域大类：{{ item.area.primary }}    </span>
                        <span class="author-des">领域小类：{{ item.area.secondary }}</span>
                    </div>

                    <div>
                        <span class="author-email author-grade">等级: {{ item.rank.toFixed(2) }}</span>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'Areas',
    props:{
        Areas:{
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
        &:not(:last-child){
            border-bottom: 1px solid #d3dce6;
        }
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
        .author-des{
            font-size: 12px;
            color: #666;
        }
        .author-grade{
            font-size: 12px;
        }
    }
}

</style>