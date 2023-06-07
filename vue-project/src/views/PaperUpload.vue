<template>
  <div>
    <div class="paper-upload-box">
      <div class="input-box">
        <!-- 论文题目栏 -->
        <div class="label">论文题目：</div>
        <div class="content-box">
          <div class="title-input">
            <el-form
              :model="titleForm"
              :rules="rules"
              ref="titleForm"
              label-width="100px"
            >
              <el-form-item label="题目：" prop="title">
                <el-input
                  v-model="titleForm.title"
                  placeholder="请输入论文题目"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 论文作者栏 -->
        <div class="label">论文作者：</div>
        <div class="content-box">
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'作者' + (index + 1)"
              :key="domain.key"
              :prop="'domains.' + index + '.email'"
              :rules="{
                required: true,
                message: '作者信息不能为空',
                trigger: 'blur',
              }"
            >
              <div class="addable-form">
                <el-input
                  v-model="domain.name"
                  placeholder="请输入作者姓名"
                ></el-input>
                <el-input
                  v-model="domain.email"
                  placeholder="请输入作者邮箱"
                ></el-input>
                <el-button
                  class="delet-button"
                  @click.prevent="removeDomain(domain)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
            <el-button class="add-button" @click="addDomain"
              >增添作者</el-button
            >
          </el-form>
        </div>
        <el-divider></el-divider>
        <!-- 论文关键词栏 -->
        <div class="label">论文关键词：</div>
        <div class="content-box">
          <el-form :model="keywords" ref="keywords" label-width="100px">
            <el-form-item
              v-for="(domain, index) in keywords.domains"
              :label="'关键词' + (index + 1)"
              :key="domain.key"
              :prop="'domains.' + index + '.keyword'"
              :rules="{
                required: true,
                message: '关键词内容不能为空',
                trigger: 'blur',
              }"
            >
              <div class="addable-form">
                <el-input
                  v-model="domain.keyword"
                  placeholder="请输入关键词"
                ></el-input>
                <el-button @click.prevent="removeKeyword(domain)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
            <el-button class="add-button" @click="addKeyword"
              >新增关键词</el-button
            >
          </el-form>
        </div>
        <el-divider></el-divider>
        <!-- 论文摘要栏 -->
        <div class="label">论文摘要：</div>
        <div class="content-box">
          <div class="abstract-input">
            <el-form
              :model="abstractForm"
              :rules="rules"
              ref="abstractForm"
              label-width="100px"
            >
              <el-form-item label="摘要：" prop="desc">
                <el-input
                  type="textarea"
                  v-model="abstractForm.desc"
                  placeholder="请输入论文摘要"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 论文参考文献栏 -->
        <div class="label">参考文献：</div>
        <div class="content-box">
          <el-form :model="refs" ref="refs" label-width="100px">
            <el-form-item
              v-for="(domain, index) in refs.domains"
              :label="'参考文献' + (index + 1)"
              :key="domain.key"
              :prop="'domains.' + index + '.ref'"
              :rules="{
                required: true,
                message: '参考文献内容不能为空',
                trigger: 'blur',
              }"
            >
              <div class="addable-form">
                <el-input
                  v-model="domain.ref"
                  placeholder="请输入参考文献"
                ></el-input>
                <el-button @click.prevent="removeRef(domain)">删除</el-button>
              </div>
            </el-form-item>
            <el-button class="add-button" @click="addRef"
              >新增参考文献</el-button
            >
          </el-form>
        </div>
        <el-divider></el-divider>
        <!-- 论文发布时间栏 -->
        <div class="label">论文发布时间：</div>
        <div class="content-box">
          <el-form
            :model="dateForm"
            :rules="rules"
            ref="dateForm"
            label-width="100px"
          >
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form>
        </div>
        <el-divider></el-divider>
        <!-- 论文领域栏 -->
        <div class="label">论文领域：</div>
        <div class="content-box">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入论文领域"
            @select="handleSelect"
            @input="loadAreas"
          ></el-autocomplete>
        </div>
        <el-divider></el-divider>
        <!-- 提交论文信息 -->
        <el-button type="primary" @click="submitAllInfo()"
          >提交论文信息</el-button
        >
        <el-divider></el-divider>
        <!-- 提交论文 -->
        <el-button type="primary" @click="uploadFile(1)">上传论文</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pid: "",
      titleForm: {
        title: "",
      },
      abstractForm: {
        desc: "",
      },
      rules: {
        title: [{ required: true, message: "请输入论文题目", trigger: "blur" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请填写论文摘要", trigger: "blur" }],
      },
      dynamicValidateForm: {
        domains: [
          {
            name: "",
            email: "",
          },
        ],
      },
      refs: {
        domains: [
          {
            ref: "",
          },
        ],
      },
      keywords: {
        domains: [
          {
            keyword: "",
          },
        ],
      },
      date: "",
      areas: [],
      state: '',
      timeout: null
    }
  },
  methods: {
    async submitAllInfo() {
      await this.$http.post('/api/v1/papers/upload/info', {
        pid: 0,
        attr: {
          title: this.titleForm.title,
          keywords: this.keywords.domains.map(domain => domain.keyword),
          abstract: this.abstractForm.desc,
          publish_date: this.formatDate(this.date)
        },
        authors: this.dynamicValidateForm.domains.map((domain, index) => ({
          email: domain.email,
          name: domain.name,
          order: index
        })),
        refs: this.refs.domains.map(domain => ({
          text: domain.ref,
          link: ''
        })),
        areas: this.areas.map(area => area.id)
      })
        .then(res => {
          console.log('submit all information success!')
          console.log(this.formatDate(this.date))
          console.log(res)
          this.pid = res.data.data.pid
          console.log(this.pid)
        }).catch(err => {
          console.log(err)
        })
        .then((res) => {
          console.log("submit all information success!");
          console.log(this.formatDate(this.date));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        name: "",
        email: "",
        key: Date.now(),
      });
    },
    addRef() {
      this.refs.domains.push({
        ref: "",
        key: Date.now(),
      });
    },
    removeRef(item) {
      var index = this.refs.domains.indexOf(item);
      if (index !== -1) {
        this.refs.domains.splice(index, 1);
      }
    },
    addKeyword() {
      this.keywords.domains.push({
        keyword: "",
        key: Date.now(),
      });
    },
    removeKeyword(item) {
      var index = this.keywords.domains.indexOf(item);
      if (index !== -1) {
        this.keywords.domains.splice(index, 1);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    uploadFile(pid) {
      console.log("upload file!");
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/pdf"; // 只接受PDF文件
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this.sendRequest(pid, file);
        }
      };
      input.click();
    },
    async sendRequest(pid, file) {
      console.log(pid)
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('pid', pid)

      // 发送文件上传请求
      const res= await this.$http.post(
        '/api/v1/papers/upload/file', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res)
    },
    querySearchAsync(queryString, cb) {
      var areas = this.areas;
      var results = queryString
        ? areas.filter(this.createStateFilter(queryString))
        : areas;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    // loadAreas() {
    //   this.$http.get('/api/v1/papers/areas/get')
    //     .then(res => {
    //       console.log('load all areas success!')
    //       console.log(res)
    //       // 将请求到的areas数组进行转换
    //       this.areas = res.data.data.areas.map(area => ({
    //         value: area.name,
    //         id: area.id
    //       }));
    //       console.log(this.areas)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    // }
    async loadAreas() {
      console.log("load all areas");
      try {
        const response = await this.$http.post("/api/v1/papers/search/areas", {
          key: this.state,
        });
        const data = response.data;
        if (data && data.areas && Array.isArray(data.areas)) {
          this.areas = data.areas.map((area) => ({
            value: area.name,
            id: area.id,
          }));
          console.log("load all areas success!");
          console.log(this.areas);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Failed to load areas:", error);
      }
    },
  },
  mounted() {
    // this.loadAreas();
  },
};
</script>
<style lang="css">
.title {
  align-items: center;
}
.label {
  text-align: center;
}
.paper-upload-box {
  /* background-color: rgb(118, 193, 255); */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.input-box {
  /* background-color: rgb(149, 212, 179); */
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content-box {
  /* background-color: rgb(238, 255, 113); */
  width: 80%;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* justify-content: center; */
}
.addable-form {
  display: flex;
  align-items: center;
  width: 100%; /* 设置宽度为100% */
}
.addable-form .el-form-item {
  margin-right: 10px;
  flex: 1; /* 设置弹性比例为1，使其填满剩余空间 */
}
.add-button {
  left: 5px;
}
</style>