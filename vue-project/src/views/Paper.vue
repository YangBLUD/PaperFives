<template>
    <div class="paper-border">
        <div class="paper-wrapper">
            <!-- title -->
            <div class="section"><span>title</span></div>
            <div class="title">
                <h1 class="mathjax">{{ paper.attr.title }}</h1>
            </div>

            <hr class="split" />

            <!-- authors -->
            <div class="section"><span>authors</span></div>
            <div class="author-list horizontal-list">
                <div v-for="(author, index) in paper.authors" class="author-item horizontal-list-item">
                    <div class="avatar">
                        <img :src="getAvatarUrl(author.avatar)" />
                    </div>
                    <div class="name" :class="{ clickable: author.uid != 0 }" @click="onClickUsername(author.uid)">{{
                        author.name }}</div>
                    <i class="fa-regular fa-envelope"></i>
                    <div class="tooltip">
                        <span class="email">{{ author.email }}</span>
                        <div class="box"></div>
                    </div>
                </div>
            </div>

            <hr class="split" />

            <!-- keywords -->
            <div class="section"><span>keywords</span></div>
            <div class="keywords-list horizontal-list">
                <div v-for="(keyword, index) in paper.attr.keywords" class="keyword">
                    <i class="fa-solid fa-circle"></i>
                    <span>{{ keyword }}</span>
                </div>
            </div>

            <hr class="split" />

            <!-- time -->
            <div class="section"><span>update history</span></div>
            <div class="time-wrapper horizontal-list">
                <div class="time horizontal-list-item">
                    <span class="time-type">Publish Time: </span>
                    <span>{{ paper.attr.publish_date }}</span>
                </div>
                <div class="time horizontal-list-item">
                    <span class="time-type">Last Update: </span>
                    <span>{{ paper.update }}</span>
                </div>
            </div>

            <hr class="split" />

            <!-- shards -->
            <div class="shard-wrapper">
                <div class="stat-wrapper horizontal-list">
                    <div class="stat" title="Clicks">
                        <i class="fa-regular fa-eye"></i>
                        <span>{{ paper.stat.clicks }}</span>
                    </div>
                    <div class="stat" title="Cites">
                        <i class="fa-solid fa-quote-left"></i>
                        <span>{{ paper.stat.cites }}</span>
                    </div>
                    <div class="stat" title="Favorites">
                        <i class="fa-regular fa-bookmark"></i>
                        <span>{{ paper.stat.favorites }}</span>
                    </div>
                    <div class="stat" title="Downloads">
                        <i class="fa-regular fa-circle-down"></i>
                        <span>{{ paper.stat.downloads }}</span>
                    </div>
                </div>
                <div class="action-wrapper horizontal-list">
                    <div class="action" title="Cite" @click="onClickCite()">
                        <i class="fa-solid fa-quote-right"></i>
                    </div>
                    <div class="action" title="Share" @click="onClickShare()">
                        <i class="fa-regular fa-share-from-square"></i>
                    </div>
                    <div class="action" title="Add to bookmark" @click="onClickFavorite()">
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                    <div class="action" title="Remove from bookmark" @click="onClickUnfavorite()">
                        <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <div class="action" title="Downloads" @click="onClickDownload()">
                        <i class="fa-regular fa-file-pdf"></i>
                    </div>
                </div>

            </div>

            <hr class="split" />

            <!-- abstract -->
            <div class="section"><span>abstract</span></div>
            <div class="abstract-wrapper">
                <p class="mathjax">{{ paper.attr.abstract }}</p>
            </div>

            <hr class="split">
            <!-- reference -->
            <div class="section"><span>reference</span></div>
            <div class="ref-list">
                <div v-if="paper.refs.length == 0">
                    <span class="bullet"></span>
                    <span class="text">Wow, a truly original paper!</span>
                </div>
                <div v-for="(ref, index) in paper.refs" class="ref">
                    <span class="bullet">[{{ index + 1 }}]</span>
                    <span class="text">{{ ref.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { initMathJax, renderByMathjax } from 'mathjax-vue';

export default {
    data() {
        return {
            paper: {
                pid: 0,
                attr: {
                    title: '',
                    keywords: [],
                    abstract: '',
                    publish_date: ''
                },
                authors: [],
                areas: [],
                date: {
                    publish: '',
                    update: ''
                },
                stat: {
                    cites: 0,
                    downloads: 0,
                    favorites: 0,
                    clicks: 0
                },
                update: '',
                refs: []
            }
        }
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
        this.onLoad();
    },
    beforeUnmount() {
    },
    unmounted() {
    },
    destroyed() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
        ////////////////////////////////////////////////////////////////////////
        //  Initialization
        ////////////////////////////////////////////////////////////////////////
        onMathJaxReady() {
            // const math = this.$refs.math
            const maths = document.getElementsByClassName('mathjax');
            for (var i = 0; i < maths.length; i++) {
                // console.log(maths[i]);
                renderByMathjax(maths[i]).catch(err => {
                    console.log(err)
                });
            }
        },

        async onLoad() {
            var pid = this.$route.query.pid;
            if (pid == null || pid <= 0) {
                this.$message.error("No such paper!");
                this.$router.back(-1);
            }
            await this.requestPaper(pid);
            initMathJax({}, this.onMathJaxReady);
        },

        ////////////////////////////////////////////////////////////////////////
        //  Auxiliary functions
        ////////////////////////////////////////////////////////////////////////
        getAvatarUrl(url) {
            return 'http://81.70.161.76:5000' + url;
        },


        ////////////////////////////////////////////////////////////////////////
        //  Auxiliary functions
        ////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////
        //  Auxiliary functions
        ////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////
        //  Auxiliary functions
        ////////////////////////////////////////////////////////////////////////
        copyTextToClipboard(text) {
            navigator.clipboard.writeText(text);
        },

        ////////////////////////////////////////////////////////////////////////
        //  Click Event handlers
        ////////////////////////////////////////////////////////////////////////
        async onClickUsername(uid) {
            if (uid == 0) {
                return;
            }
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: uid
                }
            });
        },

        async onClickCite() {
            var cite = await this.requestCite(this.paper.pid);
            if (cite == null) {
                this.$message.error("Network error! Please try again later.");
            } else {
                this.copyTextToClipboard(cite);
                this.$message.success("Cite copied to clipboard!");
            }
        },

        async onClickShare() {
        },

        async onClickFavorite() {
        },

        async onClickUnfavorite() {
        },

        async onClickDownload() {
        },


        ////////////////////////////////////////////////////////////////////////
        //  Requests
        ////////////////////////////////////////////////////////////////////////
        async requestPaper(pid) {
            await this.$http.get('api/v1/papers/download/info', {
                params: {
                    pid: pid,
                    click: 1
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                    this.$router.back();
                    return;
                }

                // get paper
                this.paper = data.data;
            }).catch(err => {
                console.log(err);
            });
        },

        async requestCite(pid) {
            await this.$http.get('api/v1/papers/action/cite', {
                params: {
                    pid: pid
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                    return null;
                }
                return data.data.cite;
            }).catch(err => {
                console.log(err);
                return null;
            });
        }
    }
}
</script>

<style>
@import '../assets/css/paper.css';
@import '../assets/css/animate.css';
</style>
