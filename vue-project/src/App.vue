<template>
  <el-container style="height: 100%">

    <el-header style="font-size: 12px">
      <Header></Header>
    </el-header>

    <el-container style="height: calc(100vh - 60px)">
      <el-aside width="200px" style="
          height: calc(100vh - 60px);
          background-color: rgb(238, 241, 246);
          overflow-x: hidden;
        ">
        <Aside></Aside>
      </el-aside>

      <el-main style="height: calc(100vh - 60px)">
        <UserInfo></UserInfo>
      </el-main>

    </el-container>
  </el-container>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.el-dropdown {
  float: right;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 40px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
import Aside from './components/AsideDemo.vue'
import Header from './components/HeaderDemo.vue'
import UserInfo from './views/UserInfo.vue'

export default {
  data () {
    return {}
  },
  components: {
    Aside,
    Header,
    UserInfo
  }
}
</script>
