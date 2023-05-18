<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-medal-1"></i>
            <span>热门</span>
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
            <el-menu-item index="2-1"
              ><i class="el-icon-star-off"></i>收藏</el-menu-item
            >
            <el-menu-item index="2-2" @click="gotoUserInfo">
              <i class="el-icon-document"></i>信息</el-menu-item
            >
            <el-menu-item index="2-3"
              ><i class="el-icon-chat-dot-round"></i>消息</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-tools"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    gotoUserInfo () {
      this.$router.push('/userinfo', () => {}, () => {})
    }
  }
}
</script>
