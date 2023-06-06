<template>
  <div class="personal-info-wrapper">
    <div class="personal-info">
      <div class="personal-info-content">
        <div class="personal-info-header">
          <div class="personal-info-title" style="font-size: 35px; font-weight: 900;">个人信息</div>
        </div>
        <br><br>
        <div style="text-align: left;">
          <span style="font-size: 25px; font-weight: 800;">基本信息</span>
        </div>
        <el-descriptions :border="true" :column="1" style="font-size: 20px;">
          <el-descriptions-item label="姓名" :span="2">{{ form.name }}</el-descriptions-item>
          <el-descriptions-item label="性别" :span="2">{{ getSex() }}</el-descriptions-item>
          <el-descriptions-item label="机构" :span="2">{{ form.institute }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="personal-info-footer">
        <el-button @click="showEditDialog()" type="primary">编辑信息</el-button>
      </div>

      <el-dialog title="基本信息" :visible.sync="dialogVisibleProfile" width="50%" :before-close="handleClose" center style="font-size: 16px">
        <el-form ref="form" :model="form" label-width="80px" style="font-size: 20px;">
          <el-form-item label="姓名">
            <el-input v-model="tempName" placeholder="请输入姓名" style="font-size: 20px;"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="tempSex" placeholder="请选择" style="font-size: 20px;">
              <el-option label="女" value="2"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="未知" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="tempInstitute" placeholder="请输入机构" style="font-size: 20px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveData">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="修改密码" :visible.sync="dialogVisiblePasswd" width="50%" :before-close="handleClose" center>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="旧密码">
            <el-input v-model="passwdOld" placeholder="请输入旧密码" show-password style="font-size: 20px;"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="passwdNew" placeholder="请输入新密码" show-password style="font-size: 20px;"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="passwdNewCheck" placeholder="请再次输入新密码" show-password style="font-size: 20px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSavePasswd">确 定</el-button>
        </span>
      </el-dialog>

      <br><br>
      <div style="text-align: left;">
        <span style="font-size: 25px; font-weight: 800;">账户信息</span>
      </div>
      <el-descriptions :border="true" :column="1" style="font-size: 20px;">
        <el-descriptions-item label="账户" :span="8">{{ form.email }}</el-descriptions-item>
      </el-descriptions>
      <div class="personal-info-footer">
        <el-button @click="showEditPassword()" type="primary">修改密码</el-button>
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
    max-width: 1000px;

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
::v-deep .el-dialog__title {
  font-size: 25px;
}

::v-deep .el-form-item__label {
  font-size: 20px;
}


</style>

<script>
export default {
  data() {
    return {
      userProfile: {},
      dialogVisibleProfile: false,
      dialogVisiblePasswd: false,
      form: {
        name: '',
        sex: '',
        institute: '',
        email: ''
      },
      tempName: '',
      tempSex: '',
      tempInstitute: '',
      passwdOld: '',
      passwdNew: '',
      passwdNewCheck: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getUserProfile();
    })
  },
  methods: {
    getSex() {
      if (this.form.sex == 0 || this.form.sex == '未知')
        return '未知'
      else if (this.form.sex == 1 || this.form.sex == '男')
        return '男'
      else
        return '女'
    },
    showEditDialog() {
      this.tempName = this.form.name;
      this.tempSex = this.form.sex;
      this.tempInstitute = this.form.institute;
      this.dialogVisibleProfile = true;
    },
    handleSaveData() {
      this.form.name = this.tempName;
      this.form.sex = this.tempSex;
      this.form.institute = this.tempInstitute;
      this.dialogVisibleProfile = false;
      this.openProfile();
    },
    showEditPassword() {
      this.dialogVisiblePasswd = true;
    },
    handleSavePasswd() {
      const reg = new RegExp('^[a-zA-Z0-9_]{6,16}$')
      if (!reg.test(this.passwdNew)) {
        this.$message({
          type: 'info',
          message: '新密码格式错误！'
        });
        return;
      }
      if (this.passwdNew != this.passwdNewCheck) {
        this.$message({
          type: 'info',
          message: '两次新密码输入不一致！'
        });
        return;
      }
      this.dialogVisiblePasswd = false;
      this.openPassword();
    },
    async getUserProfile() {
      await this.$http.get('api/v1/users/profile/user', {
        params: {
          mode: 'all',
          uid: window.sessionStorage.getItem('uid')
        }
      })
        .then(res => {
          console.log(res.data);
          this.userProfile = res.data.data;
          this.form.name = res.data.data.username;
          this.form.institute = res.data.data.attr.institute;
          if (res.data.data.attr.sex === 0)
            this.form.sex = '未知'
          else if (res.data.data.attr.sex === 1)
            this.form.sex = '男'
          else
            this.form.sex = '女'
          this.form.email = res.data.data.email;
        }).catch(err => {
          console.log(err);
        })
    },
    async changeProfile() {
      await this.$http.post('http://81.70.161.76:5000/api/v1/users/profile/profile', {
        username: this.form.name,
        sex: this.form.sex,
        institute: this.form.institute,
      })
        .then(res => {
          // console.log(res);
        }).catch(err => {
          console.log(err);
        })
    },
    async changePassword() {
      await this.$http.post('http://81.70.161.76:5000/api/v1/users/profile/password', {
        old: this.passwdOld,
        new: this.passwdNew
      })
        .then(res => {
          this.passwdOld = '';
          this.passwdNew = '';
          this.passwdNewCheck = '';
          var data = res.data;
          console.log(data);
          if (data.meta.status != 0) {
            this.$message({
              type: 'info',
              message: '旧密码输入错误！'
            });
          }
          else {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          };
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
        this.changeProfile();
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消修改'
        // });
      });
    },
    openPassword() {
      this.$confirm('此操作将修改用户的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changePassword();
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消修改'
        // });
      });
    }
  }
}
</script>