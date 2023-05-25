<template lang="html">
  <div class="paper-view-box">
    <div class="paper-view-box">
      <div class="paper-review-aside">
        <div class="circle">
          <img src="" alt="管理员头像">
        </div>
        <div class="paper-info">
          <table class="table">
            <tr>
              <td vertical-align: middle><i class="el-icon-info"></i><a class="link" href="">管理员信息</a></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="paper-review-header">
        <h1>论文题目</h1>
      </div>
      <div class="paper-review-comment">
        <div class="comment-box">
          <el-input
            type="textarea"
            :rows="19"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
        <div class="comment-button-box">
          <button class="custom-button">通过</button> <button class="custom-button">不通过</button>
          <button class="custom-button">暂存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: ''
    }
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
    margin-left: 950px;
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
    width: 900px;
    height: 140px;
    float: top;
    margin-left: 40px;
    border-radius: 15px 15px 15px 15px;
    background-color: #b3c0d1;
    color: #333;
    font: 30px bold;
  }

  .paper-review-comment {
    position: absolute;
    margin-top:180px;
    width: 890px;
    height: 420px;
    margin-left: 40px;
    border-radius: 15px 15px 15px 15px;
    background-color: #b3c0d1;
    color: #333;
    text-align: left;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    font: 10px bold;
    overflow: hidden;
  }

  .comment-box{
    margin-top: 5px;
    margin-left: 5px;
    width: 750px;
    display:inline-block;
  }

  .comment-button-box{
    position:absolute;
    margin-top: 5px;
    margin-left: 10px;
    width: 100px;
    display: inline-block;
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
    margin-block: 10px;
    border-radius: 20px;
    background-color: #333;
    color: #fff;
    font-size: 16px;
  }
</style>
