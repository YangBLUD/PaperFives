<template>
  <el-container class="home-container">
    <!-- 主页头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>论文检索系统</span>
      </div>
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>

    <el-container>
      <!-- 主页侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '160px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveState(activePath)"
            >
              <template slot="title">
                <i :class="subItem.icon"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

                </div>
                <el-menu background-color='#333744' text-color="#fff" active-text-color="#409EFF" unique-opened
                    :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active=activePath>
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                            @click=saveState(activePath)>
                            <template slot="title">
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
                <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                </el-breadcrumb>
                <el-card class="search"> -->
                    <!-- 搜索与添加区域 -->
                    <!-- <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select"
                        @keyup.enter.native="goSearch" style="width: 750px; font-size: 17px">
                        <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width: 130px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" slot="append" icon="el-icon-search" @click="goSearch"></el-button>
                    </el-input>
                </el-card>
                <div class="topRecommend" id="topRecommend">
                    <el-tabs v-model="activeNameOut">
                        <el-tab-pane label="热门文献" name="topArticle" style="text-align: left">
                            <Articles :articles="top_articles"></Articles>
                        </el-tab-pane>
                        <el-tab-pane label="热门学者" name="topAuthor" style="text-align: left">
                            <Authors :authors="top_authors"></Authors>
                        </el-tab-pane>
                    </el-tabs>
                </div> -->
            </el-main>
        </el-container>
    </el-container>
  </el-container>
</template>

<script>
import path from 'path'

export default {
  data () {
    return {
      menuList: [
        {
          id: 1,
          authName: '热门',
          icon: 'el-icon-s-open',
          path: '',
          children: [
            {
              id: 1,
              authName: '热门领域',
              icon: 'el-icon-s-open',
              path: ''
            },
            {
              id: 1,
              authName: '热门学者',
              icon: 'el-icon-s-custom',
              path: ''
            }
          ]
        },
        {
          id: 11,
          authName: '我的',
          icon: 'el-icon-user-solid',
          path: '',
          children: [
            {
              id: 1,
              authName: '收藏',
              icon: 'el-icon-star-on',
              path: ''
            },
            {
              id: 1,
              authName: '信息',
              icon: 'el-icon-document',
              path: ''
            },
            {
              id: 1,
              authName: '消息',
              icon: 'el-icon-chat-dot-square',
              path: ''
            }
          ]
        },
        {
          id: 1,
          authName: '设置',
          icon: 'el-icon-setting',
          path: ''
        }
      ],
      isCollapse: false, // 是否折叠
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 切换侧边折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接激活
    saveState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
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

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 16px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
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
</style>
