<template>
  <el-container style="height: 100%">
    <el-header style="font-size: 12px">
      <CommonHeader></CommonHeader>
    </el-header>

    <el-container style="height: calc(100vh - 60px)">
      <el-aside width="200px" style="
          height: calc(100vh - 60px);
          background-color: rgb(238, 241, 246);
          overflow-x: hidden;
        ">
        <CommonAside></CommonAside>
      </el-aside>

      <el-main style="height: calc(100vh - 60px)">
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

.el-menu-item,
.el-submenu__title {
  line-height: 80px;
}

.el-dropdown {
  float: right;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
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
  line-height: 160px;
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
import CommonAside from './components/CommonAside.vue'
import CommonHeader from './components/CommonHeader.vue'

export default {
  data () {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader
  }
}
</script>
