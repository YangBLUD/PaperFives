<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="search">
            <!-- 搜索与添加区域 -->
            <!-- @keyup.enter.native="goSearch" -->
            <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select" 
                style="width: 600px; font-size: 15px; margin: 0px 18%">
                <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width: 130px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item">
                    </el-option>
                </el-select>
                <el-button type="primary" slot="append" icon="el-icon-search" @click="gosearch()"></el-button>
            </el-input>
        </el-card>
        <div class="topRecommend" id="topRecommend">
            <el-tabs v-model="activeNameOut">
                <el-tab-pane label="热门文献" name="topArticle" style="text-align: left">
                    <Articles :articles="top_articles"></Articles>
                </el-tab-pane>
                <el-tab-pane label="热门学者" name="topAuthors" style="text-align: left">
                    <Authors :authors="top_authors"></Authors>
                </el-tab-pane>
                <el-tab-pane label="热门领域" name="topArea" style="text-align: left">
                    <Areas :Areas="top_areas"></Areas>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import Articles from "../components/hot/Articles.vue";
import Authors from "../components/hot/Authors.vue";
import Areas from "../components/hot/Areas.vue";
export default {
    components: { Articles, Authors, Areas },
    data() {
        return {
            activeNameOut: "topArticle",
            searchValue: '',
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
                },
                {
                    value: 'keywords',
                    label: '关键字'
                },
                {
                    value: 'areas',
                    label: '领域'
                },
            ],
            select: {},
            top_articles: {},
            top_areas: {},
            top_authors: [],
            search_list:[], //搜索结果
        }
    },
    created() {
        this.getHotArticles();
        this.getHotAuthors();
        this.getHotAreas();
    },
    methods: {
        async gosearch() {
            console.log(this.select)
            this.$router.push({path:"/searchres",query:{
                "field": this.select.value,
                "key": this.searchValue,
                type:1
            }})
            // const { data: res } = await this.$http.post('/api/v1/papers/search/query', {
            //     ps: 20, p: 1, advanced: false,
            //     "cond": {
            //         "field": this.select.value,
            //         "key": this.searchValue
            //     }
            // })
            // if (res.meta.status != 0) return this.$message.error("获取失败")
            // this.search_list = res.data.papers
            // console.log(this.search_list)
        },
        async getHotArticles() {
            const { data: res } = await this.$http.get('/api/v1/papers/hot/papers', { ps: 20, p: 1 })
            if (res.meta.status != 0) return this.$message.error('获取热门文献失败')
            this.top_articles = res.data.papers
        },
        async getHotAuthors() {
            const { data: res } = await this.$http.get('/api/v1/users/hot/users', { ps: 20, p: 1 })
            if (res.meta.status != 0) return this.$message.error('获取热门学者失败')
            this.top_authors = res.data.users

        },
        async getHotAreas() {
            const { data: res } = await this.$http.get('/api/v1/papers/hot/areas', { ps: 20, p: 1 })
            if (res.meta.status != 0) return this.$message.error('获取热门领域失败')
            this.top_areas = res.data.areas
        }
    }
}
</script>

<style>
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