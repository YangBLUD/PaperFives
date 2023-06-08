<template>
    <el-container class="home-container">
        <!-- 主页头部 -->
        <el-header>
            <div class="logo-wrapper">
                <img src="../assets/banner.svg" alt="" @click="toMain()"/>
                <!-- <span>论文检索系统</span> -->
            </div>
            <div v-if="isLogin">
                <el-button type="info" @click="logout">退出登录</el-button>
            </div>
            <div v-else>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="warning" @click="register">注册</el-button>
            </div>
        </el-header>

        <el-container>
            <!-- 主页侧边栏 -->
            <el-aside width="120px">
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened
                    :collapse-transition="false" :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-menu-item :index="'/' + item.path" v-for="item in menuList" :key="item.id"
                        @click="saveState(activePath)" style="padding-left: 5px;">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title" style="display:flex ;">
                            <i :class="item.icon"></i>
                            <span>{{ item.authName }}</span>
                        </template>

                    </el-menu-item>
                </el-menu>
            </el-aside>

            <!-- 主页主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
require("../assets/js/fontawesome");

export default {
    data() {
        return {
            menuList: [
                {
                    id: 1,
                    authName: "系统主页",
                    icon: "el-icon-house",
                    path: "main",
                },
                {
                    id: 2,
                    authName: "高级搜索",
                    icon: "el-icon-search",
                    path: "advsearch"

                },
                {
                    id: 3,
                    authName: "用户主页",
                    icon: "el-icon-user",
                    path: "user",
                },
                {
                    id: 4,
                    authName: "用户信息",
                    icon: "el-icon-document",
                    path: "info",
                },
                {
                    id: 6,
                    authName: "用户消息",
                    icon: "el-icon-chat-dot-square",
                    path: "message",
                }
            ],
            activePath: "",
            isLogin: ""
        }
    },
    created() {
        this.activePath = window.sessionStorage.getItem("activePath");
        if (window.sessionStorage.getItem('token') != null) {
            this.isLogin = true
        }
    },
    methods: {
        logout() {
            this.isLogin = false
            window.sessionStorage.clear();
            location.reload();
        },
        login() {
            this.$router.push({
                path: '/login'
            })
        },
        register() {
            this.$router.push({
                path: '/register'
            })
        },
        toMain() {
            this.$router.push({
                path: '/main'
            })
        },
        //保存链接激活
        saveState(activePath) {
            window.sessionStorage.setItem("activePath", activePath);
        }
    }
}
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 16px;
        }
    }
}

.lo .el-aside {
    background-color: #333744;
    width: 20px;
}

.el-main {
    background-color: #eaedf1;
}

.el-header {
    // max-height: 60px;
}

.logo-wrapper {
    height: 60px;
    padding: 0 20px;
    cursor: pointer;
}

.logo-wrapper img {
    height: 80%;
}


.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 8px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.search {
    min-width: 800px;
    width: 95%;
    margin: 20px auto;
    padding: 20px 40px 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.el-aside {
    overflow: hidden;
}

.el-menu {
    height: 100%;
}
</style>