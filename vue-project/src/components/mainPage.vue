<template>
    <div style="width: 100%">
        <el-card class="search">
            <!-- 搜索与添加区域 -->
            <!-- @keyup.enter.native="goSearch" -->
            <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select"
                style="width: 100%; font-size: 15px; margin: 0px auto">
                <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width: 130px">
                    <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item">
                    </el-option>
                </el-select>
                <el-button type="primary" slot="append" icon="el-icon-search" @click="gosearch"></el-button>
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
            title: "Home",
            activeNameOut: "topArticle",
            searchValue: '',
            options: [
                {
                    value: 'title',
                    label: '标题',
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
            select: {
                value: 'title',
                label: '标题',
            },
            top_articles: {},
            top_areas: {},
            top_authors: [],
            search_list: [], //搜索结果
        }
    },
    created() {
        this.getHotArticles();
        this.getHotAuthors();
        this.getHotAreas();
        document.title = "Home"
    },
    methods: {
        async gosearch() {
            this.$router.push({
                path: "/searchres", query: {
                    "field": this.select.value,
                    "key": this.searchValue,
                    type: 1
                }
            })
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
    min-width: 800px;
    width: 95%;
    margin: 20px auto;
    padding: 20px 40px 80px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.search {
    min-width: 800px;
    width: 95%;
    margin: 20px auto;
    padding: 20px 40px 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

/*
.input-with-select {
    height: 200px;
}
*/
</style>