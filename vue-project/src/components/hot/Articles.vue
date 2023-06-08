<template>
    <div class="articles">
        <div class="articles-body">
            <div v-for="(article, index) in articles" v-bind:key="index">
                <div style="text-align: left">
                    <div style="margin-bottom: 10px">
                        <span class="paper-title mathjax" @click="gotoPaper(article.paper.pid)">{{ article.paper.attr.title
                        }}</span>
                    </div>
                    <span v-for="(j, index) in article.paper.authors" :key="j">
                        <span v-if="j.uid != 0" @click="gotoSch(j.uid)" class="author-name">{{ j.name }}</span>
                        <span v-else class="author-not-exist">{{ j.name }}</span>
                        <span v-if="index < article.paper.authors.length - 1" style="color: #A0A0A0; font-size: 14px"> /
                        </span>
                    </span>
                    <span class="publish-year"> · {{ article.paper.attr.publish_date }}</span>
                </div>

                <div style="text-align:left;margin-top:10px;">
                    <span class="abstract mathjax">{{ article.paper.attr.abstract | ellipsis }}</span>
                </div>

                <div class="citation-count">
                    <span>{{ article.paper.stat.cites }}&nbsp;被引用</span>
                    <span>&nbsp;·&nbsp;{{ article.paper.stat.downloads }}&nbsp;被收藏</span>
                    <span>&nbsp;·&nbsp;{{ article.paper.stat.favorites }}&nbsp;下载量</span>
                    <span>&nbsp;·&nbsp;{{ article.paper.stat.clicks }}&nbsp;点击量</span>
                </div>

                <el-divider v-if="index < articles.length - 1"></el-divider>
            </div>
        </div>
    </div>
</template>
  
<script>
import { initMathJax, renderByMathjax } from 'mathjax-vue';
export default {
    name: "Articles",
    props: ["articles"],
    mounted() {
        this.onLoad();
    },
    methods: {
        gotoSch(author_id) {
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: author_id,
                }
            })
        },
        gotoPaper(paper_id) {
            this.$router.push({
                path: '/paper',
                query: {
                    pid: paper_id,
                }
            })
        },
        async onLoad() {
            await initMathJax({}, this.onMathJaxReady);
            this.onMathJaxReady();
        },
        onMathJaxReady() {
            setTimeout(function () {
                const maths = document.getElementsByClassName('mathjax');
                for (var i = 0; i < maths.length; i++) {
                    console.log(maths[i]);
                    renderByMathjax(maths[i]).catch(err => {
                        console.log(err)
                        window.location.reload();
                    });
                }
            }, 200);
        }

    },
    filters: {
        ellipsis: function (value) {
            if (!value) return "";
            if (value.length > 300) {
                return value.slice(0, 300) + "...";
            }
            return value;
        },
        filters: {
            ellipsis: function (value) {
                if (!value) return "";
                if (value.length > 300) {
                    return value.slice(0, 300) + "...";
                }
                return value;
            },
        }
    }
}
</script>
  
<style scoped>
@import "../../../src/assets/css/article.css";
</style>