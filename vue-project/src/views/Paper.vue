<template lang="html">
  <div class="paper-box">
    <!-- 题目栏 -->
    <div class="title" style="font-size:50px; font-weight: 700; text-align: center;">论文题目：{{ this.paperInfo.attr.title }}</div>
    <el-divider></el-divider>
    <!-- 作者栏 -->
    <div class="author-list-container">
      <div class="author-list" style="font-size: 20px;">
        <span>作者列表：</span>
        <ul class="author-list-horizontal">
          <li v-for="(author, index) in authors" :key="index">
            <span @click="gotoProfile(author.uid)" class="author-info">
              <span class="author-avatar">
                <el-avatar :src="'http://81.70.161.76:5000' + author.avatar" size="medium" :border="false"></el-avatar>
              </span>
              <span>
                {{ author.name }}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <el-divider></el-divider>
    <!-- 发布时间等信息 -->
    <div class="date" style="font-size: 20px;">发表日期：{{ this.paperInfo.attr.publish_date }}</div>
    <el-divider></el-divider>
    <!-- 操作按钮 -->
    <div class="other">
      <div class="info">
        <i class="el-icon-view icon">{{ this.stat.clicks }}</i>
      </div>
      <div class="button">
        <i class="el-icon-bell icon" @click=""></i>
        <i class="el-icon-download icon" @click="downloadPaper()"></i>
      </div>
      <br>
    </div>
    <el-divider></el-divider>
    <!-- 论文摘要 -->
    <div class="abstract">
    </div>
    <el-divider></el-divider>
    <!-- 论文引用 -->
    <div class="reference">
      <div class="text-box">

      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<script>
export default {
  data () {
    return {
      paperInfo: {},
      attr: {},
      authors: [],
      refs: [],
      areas: '',
      stat: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getPaperInfo()
      this.getAuthorsData()
    })
  },
  methods: {
    async getUserProfile (email) {
      await this.$http.get('api/v1/users/profile/user', {
        params: {
          mode: 'all',
          email: email
        }
      })
        .then(res => {
          console.log('user profile')
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    async getAuthorsData () {
      for (const author of this.authors) {
        await this.getUserProfile(author.email).then(res => {
          author.avatar = res.data.data.avatar
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async getPaperInfo () {
      await this.$http.get('/api/v1/papers/download/info', {
        params: {
          pid: '1',
          click: '0'
        }
      })
        .then(res => {
          console.log(res)
          this.paperInfo = res.data.data
          this.attr = res.data.data.attr
          this.authors = res.data.data.authors
          this.refs = res.data.data.refs
          this.areas = res.data.data.areas
          this.stat = res.data.data.stat
        }).catch(err => {
          console.log(err)
        })
    },
    gotoProfile (id) {
      this.$router.push({
        path: '/visitor',
        query: {
          id: id
        }
      })
    },
    downloadPaper () {
      const url = '/api/v1/papers/download/file'
      const params = { pid: this.paperInfo.pid }
      // 使用axios进行请求
      this.$http.get(url, { params, responseType: 'blob' }) // 设置responseType为blob用来接收pdf文件
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', this.paperInfo.attr.title + '.pdf')// 'paper.pdf' 可以替换为你想要的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          // Handle error here
          console.log(error)
        })
    }
  }
}
</script>
<style lang="css">
  .info {
    /* 靠左 */
    float: left;
    display: inline-block;
  }
  .button {
    /* 靠右 */
    float: right;
    display: inline-block;
  }
  .icon {
    font-size: 20px;
  }
  .author-list-container {
    width: 100%; /* 设置固定宽度和高度 */
    height: 50px;
    overflow-x: auto;/* 设置溢出内容显示和滚动条样式 */
    white-space: nowrap; /* 防止文本换行 */
  }
  .author-list-horizontal {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .author-list-horizontal li {
    display: inline-block;
    margin-right: 30px; /* 可以根据需要调整项目之间的间距 */
  }
  .author-list {
    display: flex;
    align-items: center;
  }
  .author-info {
    display: flex;
    align-items: center;
  }
  .author-avatar {
    margin-right: 10px;
  }
</style>
