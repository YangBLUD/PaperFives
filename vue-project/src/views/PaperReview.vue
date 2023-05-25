<template lang="html">
  <div class="paper-view-box">
    <div class="paper-view-box">
      <div class="paper-review-aside">
        <div class="circle">
          <img src="" alt="用户头像">
        </div>
        <div class="paper-info">
          <table class="table">
            <tr>
              <td vertical-align: middle><i class="el-icon-info"></i><a class="link" href="">管理员信息</a></td>
            </tr>
          </table>
          <div class="button-wrapper">
            <button class="custom-button">
              审核
            </button>
          </div>
        </div>
      </div>
      <div class="paper-review-header">
        <h1>论文题目</h1>
      </div>
      <div class="paper-review-author">
        <h2>作者</h2>
      </div>
      <div class="paper-review-abstract">
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

  .paper-review-aside {
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

  .paper-review-header {
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

  .paper-review-author {
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

  .paper-review-abstract {
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

  .button-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    width: 120px;
    height: 40px;
    margin: 0 auto;
  }

  .custom-button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
    background-color: #333;
    color: #fff;
    font-size: 16px;
    }
  </style>
