<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="topRecommend" id="topRecommend">
            <h1>为您搜索到一下{{search_list.length}}条内容</h1>
            <Articles :articles="search_list"></Articles>
        </div>
    </div>
</template>
<script>
import Articles from '@/components/hot/Articles.vue'
export default {
  components: { Articles },
  data () {
    return {
      field: '',
      key: '',
      type: '',
      search_list: [],
      time_from: '',
      time_to: ''
    }
  },
  created () {
    this.field = this.$route.query.field
    this.key = this.$route.query.key
    this.type = this.$route.query.type
    this.time_from = this.$route.query.time_from
    this.time_to = this.$route.query.time_to
    if (this.type == 1) {
      this.getList()
    } else {
      this.getList1()
    }
  },
  methods: {
    async getList () {
      const { data: res } = await this.$http.post('/api/v1/papers/search/query', {
        ps: 20,
        p: 1,
        advanced: false,
        cond: {
          field: this.field,
          key: this.key
        }
      })
      if (res.meta.status != 0) return this.$message.error('获取失败')
      const search_list = res.data.papers
      this.search_list = search_list.map(item => {
        return {
          paper: item
        }
      })
    },
    async getList1 () {
      const searchValue = JSON.parse(localStorage.getItem('searchValue'))
      const where = {}
      const arr = []
      searchValue.forEach(item => {
        if (item.content) {
          arr.push({
            mode: item.type,
            field: item.category,
            key: item.content
          })
        }
      })
      where.cond = arr
      where.attr = {
        order: '-date',
        from: this.time_from,
        to: this.time_to
      }
      const { data: res } = await this.$http.post('/api/v1/papers/search/query', {
        ps: 20,
        p: 1,
        advanced: true,
        ...where
      })
      if (res.meta.status != 0) return this.$message.error('获取失败')
      const search_list = res.data.papers
      this.search_list = search_list.map(item => {
        return {
          paper: item
        }
      })
    }
  }
}
</script>

<style>
@import "../../../src/assets/css/article.css";

.topRecommend {
    min-width: 900px;
    margin: 50px 12%;
    padding: 20px 40px 80px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.search {
    min-width: 900px;
    margin: 20px 12%;
    padding: 20px 40px 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
