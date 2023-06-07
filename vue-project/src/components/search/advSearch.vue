<template>
  <div class="advSearch">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="option-div" v-bind:class="{ changeH: !isShow }">
      <el-row>
        <el-col class="retrieval">
          <el-row :class="{ 'category-first': !index, 'category': index }" v-for="(item, index) in searchValue" :key="index">
            <el-col :span="21">
              <el-input placeholder="请输入内容" v-model="item.content" class="input-with-select">
                <el-select v-if="index > 0" v-model="item.type" slot="prepend" style="width: 80px; margin-right: 10px">
                  <el-option v-for="(item, index) in types" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="item.category" slot="prepend" style="width: 120px">
                  <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-input>
            </el-col>
            <el-col :span="3" v-if="isShow">
              <el-button v-if="index" circle icon="el-icon-minus" @click="deleteCategory(index)"></el-button>
              <el-button :class="{ 'button_right': !index }" circle icon="el-icon-plus"
                @click="addCategory(index)"></el-button>
            </el-col>
            <el-col :span="3" v-else>
              <el-button type="success" icon="el-icon-search" style="margin-left: 20px"
                @click="advanceSearch">&nbsp;检&nbsp;索</el-button>
            </el-col>
          </el-row>
          <el-row class="time">
            <span style="color: #8f9298; font-size: 14px; margin-right: 47px">发表日期</span>
            <el-date-picker v-model="timeRange" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-row>
          <el-row class="button">
            <el-button type="success" icon="el-icon-search" @click="advanceSearch">&nbsp;检&nbsp;索</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-button icon="el-icon-arrow-down" @click="isShow = !isShow" v-if="!isShow" class="changeButton"></el-button>
    <el-button icon="el-icon-arrow-up" @click="isShow = !isShow" v-if="isShow" class="changeButton"></el-button>
    <!--    <el-row style="margin-top: 50px" >这里是文章列表</el-row>-->
    <ArticleRes v-if="isShowRes" mode="advance" :total_hits="total_hits" :total_hits_str="total_hits_str"
      :articles="resultList" :aggregation="aggregation" :conditions="this.searchValue" :min_date="timeRange[0]"
      :max_date="timeRange[1]" @changeCollect="changeCollect" @high="highlight" style="margin-top: 30px"></ArticleRes>
  </div>
</template>

<script>

export default {
  name: "AdvSearch",
  data() {
    return {
      resultList: [],

      isShow: true,
      isShowRes: false,
      searchValue: [
        {
          category: 'title',
          content: "",
          type: "and",
        },
        {
          category: 'authors',
          content: "",
          type: "and",
        },
      ],
      timeRange: ['0', '0'],
      options: [
        {
          value: 'title',
          label: '篇名',
        }, {
          value: 'authors',
          label: '作者'
        }, {
          value: 'abstract',
          label: '摘要'
        }, {
          value: 'keywords',
          label: '关键字'
        }, {
          value: 'areas',
          label: '领域'
        }
      ],
      types: [
        {
          value: "and",
          label: 'and',
        }, {
          value: "or",
          label: 'or'
        }, {
          value: "not",
          label: 'not'
        },
      ],
    }
  },
  methods: {
    deleteCategory: function (index) {
      this.searchValue.splice(index, 1)
    },
    addCategory: function (index) {
      if (this.searchValue.length >= 5) {
        this.$message.warning('添加失败！检索项必须在5条以内！')
        return;
      }
      this.searchValue.push({
        category: this.searchValue[index].category,
        content: '',
        type: this.searchValue[index].type,
      })
    },
    isValueEmpty() {
      for (let i = 0; i < this.searchValue.length; i++)
        if (this.searchValue[i].content !== '')
          return false;
      return true;
    },
    advanceSearch() {
      console.log(this.searchValue)
      localStorage.setItem("searchValue", JSON.stringify(this.searchValue))
      this.$router.push({
        path: "/searchres", query: {
          "time_from": this.timeRange[0],
          "time_to": this.timeRange[1],
          type: 2
        }
      })


    },
    getCollectStatus() {
    },
    changeCollect(data) {
    },
  },
}
</script>

<style scoped>
.advSearch {
  width: 100%;
  height: 100%;
}

.advSearch #option-div {
  transition: 1s fade;
  min-height: 80px;
  width: 75%;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  margin-left: 190px;
  margin-top: 10px;
  overflow: hidden;
}

.changeH {
  height: 80px !important;
}

.changeButton {
  height: 20px;
  width: 50px;
  padding: 0 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.retrieval {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;

}

.category {
  margin-top: 20px;
}

.category-first {
  margin-left: 70px;
  padding-right: 1%;
}

.button_right {
  margin-left: 50%;
}

.time {
  float: left;
  margin-top: 20px;
  padding-left: 88px;
}

.button {
  margin-top: 20px;
  margin-left: 696px;
}
</style>