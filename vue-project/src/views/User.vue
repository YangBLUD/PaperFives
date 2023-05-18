<template>
    <el-row>
        <el-col :span="8">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/logo.png" />
                    <div>
                        <p class="name">Admin</p>
                        <p class="access">管理员</p>
                    </div>
                </div>
            </el-card>
            <h3 class="page-title">我的关注</h3>
            <!-- 关注列表 -->
            <el-row :gutter="20" class="follow-list">
                <el-col :span="24" v-for="(item, index) in followList" :key="index">
                    <el-card shadow="hover" class="follow-item">
                        <div class="follow-info">
                            <!-- 用户头像 -->
                            <div style="flex: 1;">
                                <el-avatar :src="item.avatar" size="90" :border="false"></el-avatar>
                            </div>
                            <!-- 用户名 -->
                            <div class="name" style="flex: 2;">{{ item.username }}</div>
                        </div>
                        <!-- 关注操作 -->
                        <div class="follow-action">
                            <el-button type="danger" size="small" @click="removeFollow(index)">取消关注</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>

        <el-col :span="16"></el-col>
    </el-row>
</template>
  
<script>
export default {
    data() {
        return {
            followList: [
                { username: "张三四", avatar: "https://picsum.photos/id/1028/1000/1000" },
                { username: "李四", avatar: "https://picsum.photos/id/1019/1000/1000" },
                { username: "王五", avatar: "https://picsum.photos/id/1027/1000/1000" },
                { username: "赵六", avatar: "https://picsum.photos/id/1026/1000/1000" },
                { username: "赵六", avatar: "https://picsum.photos/id/1026/1000/1000" },
                { username: "赵六", avatar: "https://picsum.photos/id/1026/1000/1000" },
                { username: "赵六", avatar: "https://picsum.photos/id/1026/1000/1000" },
                { username: "张三", avatar: "https://picsum.photos/id/1028/1000/1000" },
                { username: "张三", avatar: "https://picsum.photos/id/1028/1000/1000" },
                { username: "张三", avatar: "https://picsum.photos/id/1028/1000/1000" },
            ],
        };
    },
    methods: {
        removeFollow(index) {
            this.followList.splice(index, 1);
        },
    },
};
</script>
  
<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .name {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .access {
        color: gray;
    }
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.follow-list {
    margin-top: 20px;
    height: 500px;
    overflow-y: auto;
}

.follow-item {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;

    .follow-info {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .el-card__body {
        padding: 0px;
        background-color: powderblue;
    }
}

.follow-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.el-card ::v-deep .el-card__body {
    width: 500x;
}
</style>
  