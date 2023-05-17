<template>
  <div>
    <span style="float: left; margin-left: 16px; font-size: 20px; font-weight: 700">论文检索系统</span>
    <el-input placeholder="请输入内容" style="width: 800px; text-align: center"></el-input>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
