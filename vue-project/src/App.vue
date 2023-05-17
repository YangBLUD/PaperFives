<template>
  <el-container style="height: 100%">
    <el-header style="font-size: 12px">
      <span
        style="
          float: left;
          margin-left: 16px;
          font-size: 20px;
          font-weight: 700;
        "
        >论文检索系统</span
      >
      <el-input
        placeholder="请输入内容"
        style="width: 800px; text-align: center"
      ></el-input>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside
        width="200px"
        style="height: calc(100vh - 60px); background-color: rgb(238, 241, 246)"
      >
        <el-row class="tac">
          <el-col>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-home"></i>
                  <span>首页</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">热门领域</el-menu-item>
                  <el-menu-item index="1-2">热门学者</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-search"></i>
                <span slot="title">搜索</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">我的</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">收藏</el-menu-item>
                  <el-menu-item index="2-2">信息</el-menu-item>
                  <el-menu-item index="2-3">消息</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="4">
                <i class="el-icon-s-tools"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-main style="height: calc(100vh - 60px)">
        <el-table>
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
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

body > .el-container {
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
