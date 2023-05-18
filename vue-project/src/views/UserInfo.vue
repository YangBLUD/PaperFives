<template>
  <div class="personal-info-wrapper">
    <div class="personal-info">
      <div class="personal-info-header">
        <h2 class="personal-info-title">个人信息</h2>
      </div>

      <br><br><br>
      <el-descriptions title="基本信息" :border="true">
        <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ form.sex === '1' ? '男' : '女' }}</el-descriptions-item>
        <el-descriptions-item label="所属机构">{{ form.institution }}</el-descriptions-item>
        <el-descriptions-item label="个性签名">{{ form.description }}</el-descriptions-item>
      </el-descriptions>

      <br><br>
      <div class="personal-info-footer">
        <el-button @click="dialogVisible1 = true" type="primary">编辑信息</el-button>
      </div>

      <br><br><br>
      <el-descriptions title="账户信息" :border="true" :column="1" :size="size">
        <el-descriptions-item label="邮箱">{{ form.email }}</el-descriptions-item>
      </el-descriptions>

      <br>
      <div class="personal-info-footer">
        <el-button @click="dialogVisible2 = true" type="primary">修改密码</el-button>
      </div>

      <div>
        <el-dialog title="基本信息" :visible.sync="dialogVisible1" width="50%" :before-close="handleClose" center>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名" style="width: 106px;"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择" style="width: 106px;">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-input v-model="form.institution" placeholder="请输入所属机构" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
              <el-input v-model="form.description" placeholder="请输入个性签名"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="dialogVisible2" width="40%" :before-close="handleClose" center>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="原密码">
              <el-input v-model="form.passwd_test" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.passwd_new" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码">
              <el-input v-model="form.passwd_new_test" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-info-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
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
</style>

<script>
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        name: '',
        sex: '',
        institution: '',
        description: '',
        email: '',
        passwd: '',
        passwd_test: '',
        passwd_new: '',
        passwd_new_test: ''
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    }
  }
}
</script>
