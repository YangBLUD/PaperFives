<template lang>
  <div class="paper-box">
    <!-- 题目栏 -->
    <h1 class="title" style="font-size:50px; font-weight: 700; text-align: center;">{{ this.paperInfo.attr.title }}</h1>
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
    <h2 class="date">发表日期：{{ this.paperInfo.attr.publish_date }}</h2>
    <el-divider></el-divider>
    <!-- 论文摘要 -->
    <div class="abstract">
      <h2>论文摘要</h2>
      <div>
        {{ this.paperInfo.attr.abstract }}
      </div>
    </div>
    <el-divider></el-divider>
    <!-- 论文引用 -->
    <div class="reference">
      <h2>论文引用</h2>
      {{ this.refs }}
    </div>
    <el-divider></el-divider>
    <!-- 论文审核 -->
    <div class="review">
      <h2>审核意见</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="是否通过" prop="pass">
          <el-switch inactive-color=#FF0000 v-model="ruleForm.pass"></el-switch>
        </el-form-item>
        <el-form-item label="指导意见" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paperInfo: {},
      attr: {},
      authors: [],
      refs: [],
      areas: '',
      stat: {},
      citeInfo: {},
      ruleForm: {
        pass: false,
        desc: ''
      },
      rules: {
        pass: [
          { required: true, message: '是否通过', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写指导意见', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getPaperInfo()
      this.getAuthorsData()
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('desc: ' + this.ruleForm.desc)
          console.log('status: ' + this.ruleForm.pass)
          this.reviewPaper()
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    },
    reviewPaper() {
      this.$http.post('/api/v1/papers/review/review', {
        pid: this.paperInfo.pid,
        status: this.ruleForm.pass,
        comment: this.ruleForm.desc
      })
        .then(res => {
          console.log('review paper')
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    async getUserProfile(email) {
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
    async getPaperInfo() {
      await this.$http.post('/api/v1/papers/review/get', {
        pid: this.$route.query.pid
      })
        .then(res => {
          console.log('paper info')
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
    gotoProfile(id) {
      this.$router.push({
        path: '/visitor',
        query: {
          uid: id
        }
      })
    },
    downloadPaper() {
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
    },
    async getCiteInfo() {
      await this.$http.get('/api/v1/papers/action/cite', {
        params: {
          pid: this.paperInfo.pid
        }
      })
        .then(res => {
          console.log(res)
          this.dialogVisible = true
          this.citeInfo = res.data.data
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="css">
.paper-box {
  width: 90%;
  padding: 40px;
  margin-top: 2%;
  margin-left: 2%;
  background-color: #fffffff0;
}

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
  margin-right: 20px;
}

.author-list-container {
  width: 100%;
  /* 设置固定宽度和高度 */
  height: 50px;
  overflow-x: auto;
  /* 设置溢出内容显示和滚动条样式 */
  white-space: nowrap;
  /* 防止文本换行 */
}

/*作者列表*/
.author-list-horizontal {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
}

.author-list-horizontal li {
  display: inline-block;
  margin-right: 30px;
  /* 可以根据需要调整项目之间的间距 */
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

.date {
  text-align: left;
  font-size: 20px;
}

.abstract {
  text-align: left;
  font-size: 16px;
}

.reference {
  text-align: left;
  font-size: 16px;
}

.review {
  text-align: left;
  font-size: 16px;
}</style>
