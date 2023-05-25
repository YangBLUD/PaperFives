<template lang="html">
  <div class="paper-view-box">
    <div class="paper-view-box">
      <div class="paper-view-aside">
        <div class="circle">
          <img src="" alt="用户头像">
        </div>
        <div class="paper-info">
          <table class="table">
          <tr>
            <td vertical-align: middle><i class="el-icon-info"></i><a class="link" href="">发布者信息</a></td>
          </tr>
          <tr>
            <td><i class="el-icon-star-off"> 收藏量：</i></td>
          </tr>
          <tr>
            <td><i class="el-icon-share"> 分享量：</i></td>
          </tr>
          <tr>
            <td><i class="el-icon-view"> 浏览量：</i></td>
          </tr>
          <tr>
            <td><i class="el-icon-download"> 下载量：</i></td>
          </tr>
        </table>
        </div>
      </div>
      <div class="paper-view-header">
        <h1>论文题目</h1>
      </div>
      <div class="paper-view-author">
        <h2>作者</h2>
      </div>
      <div class="paper-view-abstract">
        <h2>摘要</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {
  }
}
</script>

<style lang="css">
  .paper-view-box{
    overflow: auto; /* 当内容溢出容器时，显示滚动条 */
  }

  .paper-view-aside {
    position: absolute;
    height: 600px;
    width: 20vw;
    margin-left: 62vw;
    margin-top:20px;
    border-radius: 15px 15px 15px 15px;
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
    text-align: center;
  }

  .circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }

  .link {
    text-decoration: none; /* 去除下划线 */
    color: #000; /* 设置颜色 */
  }

  .paper-view-header {
    position: absolute;
    margin-top:20px;
    width: 58vw;
    height: 120px;
    float: top;
    margin-left: 3vw;
    border-radius: 15px 15px 15px 15px;
    background-color: #b3c0d1;
    color: #333;
    font: 30px bold;
  }

  .paper-view-author {
    position: absolute;
    margin-top:155px;
    width: 57vw;
    height: 60px;
    float: top;
    margin-left: 3vw;
    border-radius: 15px 15px 15px 15px;
    background-color: #b3c0d1;
    color: #333;
    text-align: left;
    padding-bottom: 10px;
    padding-left: 15px;
    font: 15px bold;
  }

  .paper-view-abstract {
    position: absolute;
    margin-top:240px;
    width: 57vw;
    height: 370px;
    margin-left: 3vw;
    border-radius: 15px 15px 15px 15px;
    background-color: #b3c0d1;
    color: #333;
    text-align: left;
    padding-bottom: 10px;
    padding-left: 15px;
    font: 10px bold;
  }
  </style>
