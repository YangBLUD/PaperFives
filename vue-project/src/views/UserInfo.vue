<template>
  <div class="personal-info-wrapper">
    <div class="personal-info">
      <div class="personal-info-content">
        <div class="personal-info-header">
          <h2 class="personal-info-title">个人信息</h2>
        </div>
        <br>
        <el-descriptions title="基本信息" :border="true" :column="3" :size="size">
          <el-descriptions-item label="姓名" :span="2">{{ form.name }}</el-descriptions-item>
          <el-descriptions-item label="年龄" :span="2">{{ form.age }}</el-descriptions-item>
          <el-descriptions-item label="性别" :span="2">{{ form.sex === '1' ? '男' : '女' }}</el-descriptions-item>
          <el-descriptions-item label="出生日期" :span="2" :type="date">{{ form.birth }}</el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">{{ form.addr }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="personal-info-footer">
        <el-button @click="dialogVisible = true" type="primary">编辑信息</el-button>
      </div>

      <el-dialog title="基本信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="form.birth" type="date" placeholder="请选择出生日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <br>
        <el-descriptions title="账户信息" :border="true" :column="1" :size="size">
          <el-descriptions-item label="用户名" :span="8">{{ form.name }}</el-descriptions-item>
          <el-descriptions-item label="账户" :span="8">{{ form.age }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-info-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;

  .personal-info {
    width: 100%;
    max-width: 800px;

  .personal-info-header {
    text-align: center;
    padding: 20px 20px 10px 20px;
    background-color: #f0f2f5;
    position: sticky;
    top: 0;
    z-index: 1;
}
    .personal-info-footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      .el-button {
        width: 120px;
        font-size: 16px;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      }
    }
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      await this.$http.get('api/v1/users/profile/user', {
        params: {
          mode: 'all',
          uid: 1
        }
      })
        .then(res => {
          console.log(res.data);
          this.userProfile = res.data.data;
        }).catch(err => {
          console.log(err);
        })
    },
    async changeProfile() {
      await this.$http.post('http://81.70.161.76:5000/api/v1/users/profile/profile', {
        username : this.form.name,
        sex : this.form.sex,
        institute: this.form.institute,
        motto: this.form.motto
      })
        .then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
    },
    async changePassword() {
      await this.$http.post('http://81.70.161.76:5000/api/v1/users/profile/password', {
        old: this.form.passwd_old,
        new: this.form.passwd_new
      })
        .then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    },
    openProfile() {
        this.$confirm('此操作将修改用户的基本信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      },
      openPassword() {
        this.$confirm('此操作将修改用户的密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
  }
}
</script>