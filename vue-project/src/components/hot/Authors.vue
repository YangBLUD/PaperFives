<template>
    <div class="authors">
        <div class="authors-body">
            <div class="author-main" v-for="(item, index) in authors" :key="index">
                <div class="avatar" v-if="item.user.avatar">
                    <img :src="'http://81.70.161.76:5000' + item.user.avatar"/>
                </div>
                <div class="user-info">
                    <div>
                        <span class="author-name" @click=gotoSch(item.user.uid)>{{ item.user.username }}</span>
                    </div>
                    <div>
                        <span class="author-email">{{ item.user.email }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Authors',
    props: {
        authors: {
            default: []
        }
    },
    methods: {
        async gotoSch(author_id) {
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: author_id,
                }
            })
        }
    }
}
</script>
<style lang="scss">
.authors {
    .authors-body {
        display: flex;
        flex-wrap: wrap;
    }

    .author-name {
        display: inline-block;
        font-family: 'OpenSans-Bold', sans-serif;
        margin-left: 20px;
        color: black;
        font-size: 20px;
        font-weight: 600;
        /* 设置初始状态字体为普通体 */
        transition: color 0.3s ease-in-out,
            transform 0.2s ease-in-out;
        /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
    }

    .author-name:hover {
        cursor: pointer;
        transform: scale(1.1);
        color: #0077ff !important;
    }

    .author-email {
        font-family: 'OpenSans', sans-serif;
        margin-left: 20px;
        color: black;
        font-size: 14px;
    }

    .author-main {
        display: flex;
        align-items: center;
        flex: 0 0 50%;
        padding-bottom: 20px;

        // .avator {
        //     width: 80px;
        //     height: 100px;
        //     text-align: center;
        //     display: flex;
        //     align-items: center;

        //     img {
        //         width: 62px;
        //         height: 62px;
        //         border: 1px solid;
        //         vertical-align: middle;
        //     }
        // }
        .avatar {
            position: relative;
            size: 10px;
            transition: all 0.3s ease-in-out;
            /* 添加过渡效果 */
            transform: scale(1);
            /* 设置默认的缩放比例 */
            opacity: 0.8;
            /* 设置默认的透明度 */
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
        }

        .avatar:hover {
            cursor: pointer;
            position: relative;
            transform: scale(1.1);
            opacity: 1;
        }

        .user-info {
            flex: 1;
        }
    }
}
</style>