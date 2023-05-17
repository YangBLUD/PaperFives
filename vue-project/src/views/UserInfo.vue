<template>
  <div class="personal-info">
    <el-dialog title="个人信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center>
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

    <div class="personal-info-header">
      <h2 class="personal-info-title">个人信息</h2>
    </div>

    <div class="personal-info-content">
      <div class="personal-info-item">
        <div class="item-label">姓名：</div>
        <div class="item-value">{{ form.name }}</div>
      </div>
      <div class="personal-info-item">
        <div class="item-label">年龄：</div>
        <div class="item-value">{{ form.age }}</div>
      </div>
      <div class="personal-info-item">
        <div class="item-label">性别：</div>
        <div class="item-value">{{ form.sex === '1' ? '男' : '女' }}</div>
      </div>
      <div class="personal-info-item">
        <div class="item-label">出生日期：</div>
        <div class="item-value">{{ form.birth }}</div>
      </div>
      <div class="personal-info-item">
        <div class="item-label">地址：</div>
        <div class="item-value">{{ form.addr }}</div>
      </div>
      <div class="personal-info-footer">
        <el-button @click="dialogVisible = true" type="primary">编辑信息</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-info-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .personal-info {
    width: 100%;
    max-width: 600px;

    .personal-info-header {
      text-align: center;
      padding: 20px 20px 10px 20px;
      background-color: #f0f2f5;
    }

    .personal-info-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;

      .personal-info-item {
        display: flex;
        align-items: center;
        margin-top: 10px;
        line-height: 1.2;

        .item-label {
          width: 80px;
          color: #999;
          font-size: 16px;
        }

        .item-value {
          font-size: 18px;
          color: #333;
          letter-spacing: 1px;
        }
      }
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
  data () {
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
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    }
  }
}
</script>
