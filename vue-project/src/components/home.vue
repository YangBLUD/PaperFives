<template>
  <el-container class="home-container">
    <!-- 主页头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>论文检索系统</span>
      </div>
      <div v-if="isLogin">
        <el-button type="info" @click="logout">退出登录</el-button>
      </div>
      <div v-else>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 主页侧边栏 -->
      <el-aside width="64px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened
          :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
              @click="saveState(activePath)" >
              <template slot="title" >
                <i :class="subItem.icon"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
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
          authName: "系统",
          icon: "el-icon-s-open",
          path: "",
          children: [
            {
              id: 2,
              authName: "系統主頁",
              icon: "el-icon-s-open",
              path: "main",
            },
            {
              id: 3,
              authName: "高级搜索",
              icon: "el-icon-search",
              path: "advsearch"
            },
          ]
        },
        {
          id: 3,
          authName: "用户",
          icon: "el-icon-user-solid",
          path: "",
          children: [
            {
              id: 4,
              authName: "用戶主页",
              icon: "el-icon-house",
              path: "user",
            },
            {
              id: 5,
              authName: "用戶信息",
              icon: "el-icon-document",
              path: "info",
            },
            {
              id: 6,
              authName: "用戶消息",
              icon: "el-icon-chat-dot-square",
              path: "message",
            },
          ],
        },
      ],
      isCollapse: true, //是否折叠
      activePath: "",
      isLogin:""
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    if(window.sessionStorage.getItem('token')!=null){
      this.isLogin=true
    }
  },
  methods: {
    logout() {
      this.isLogin=false
      window.sessionStorage.clear();
    },
    login(){
      this.$router.push({
        path:'/login'
      })
    },
    //保存链接激活
    saveState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
  },
};
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

.el-aside {
  background-color: #333744;
  width: 20px;
}

.el-main {
  background-color: #eaedf1;
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
  margin: 50px 12%;
  background-color: white;
  min-width: 900px;
}

.el-aside {
  overflow: hidden;
}
</style>