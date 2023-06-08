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

            <!-- areas -->
            <div class="section"><span>areas</span></div>
            <div class="area-list horizontal-list">
                <div v-for="(area, index) in paper.areas" class="area">
                    <i class="fa-solid fa-circle"></i>
                    <span>{{ area.name }}</span>
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
                    <div v-show="!this.isFavorite" class="action" title="Add to bookmark" @click="onClickFavorite()">
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                    <div v-show="this.isFavorite" class="action" title="Remove from bookmark" @click="onClickUnfavorite()">
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

            <hr class="split">

            <!-- review -->
            <div class="section"><span>review</span></div>

            <div class="review-wrapper">
                <div class="comment-wrapper">
                    <!-- <div class="comment-title">Comment</div> -->
                    <div class="comment-text">
                        <textarea ref="input" placeholder="Give a brief comment on this paper..."></textarea>
                    </div>
                </div>
                <div class="button-wrapper">
                    <div class="status-wrapper">
                        <div class="status icon-wrapper" :class="{ pass: pass.isPassed }" @click="onSelectPass()"><i
                                class="fa-solid fa-check" :class="{ 'fa-bounce': pass.onPassed }"></i></div>
                        <div class="status icon-wrapper" :class="{ reject: reject.isRejected }" @click="onSelectReject()"><i
                                class="fa-solid fa-xmark" :class="{ 'fa-bounce': reject.onRejected }"></i></div>
                    </div>
                    <div class="submit-wrapper">
                        <div class="submit icon-wrapper" @click="onClickSubmit()"><i class="fa-solid fa-circle-arrow-right"
                                :class="{ 'fa-bounce': onSubmit }"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { initMathJax, renderByMathjax } from 'mathjax-vue';
import download from 'downloadjs';

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
            },
            isFavorite: false,
            relatedPapers: [],
            key: 0,
            pass: {
                isPassed: false,
                onPassed: false
            },
            reject: {
                isRejected: false,
                onRejected: false
            },
            onSubmit: false
        }
    },
    beforeCreate() {
    },
    created() {
        document.title = "PaperReview"
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
        },

        async onLoad() {
            var pid = this.$route.query.pid;
            if (pid == null || pid <= 0) {
                this.$message.error("No such paper!");
                this.$router.back(-1);
            }
            await this.requestPaper(pid);
            await this.requestFavoriteStatus(pid);
            initMathJax({}, this.onMathJaxReady);

            this.requestRelatedPapers();
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
        copyTextToClipboard(text) {
            navigator.clipboard.writeText(text);
        },

        goBack() {
            this.$router.back();
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
            var cite = await this.requestCite(this.paper.pid)
            if (cite != null) {
                this.copyTextToClipboard(cite);
                this.$message.success("Cite copied to clipboard!");
            }

        },

        async onClickShare() {
            var link = window.location.href;
            this.copyTextToClipboard(link);
            this.$message.success("Share link copied to clipboard!");
        },

        async onClickFavorite() {
            await this.requestFavoritePaper(this.paper.pid);
        },

        async onClickUnfavorite() {
            await this.requestUnfavoritePaper(this.paper.pid);
        },

        async onClickDownload() {
            await this.requestDownloadPaper(this.paper.pid);
        },

        async onClickRelatedPaper(pid) {
            console.log(pid);
            await this.$router.push({
                path: '/paper',
                query: {
                    pid: pid
                }
            });
            window.location.reload();
        },

        async onSelectPass() {
            this.unSelectReject();
            if (this.pass.isPassed) {
                return;
            }
            this.pass.isPassed = true;
            this.pass.onPassed = true;
            setTimeout(function (obj) {
                obj.pass.onPassed = false;
            }, 1000, this);
        },
        unSelectPass() {
            this.pass.isPassed = false;
            this.pass.onPassed = false;
        },

        async onSelectReject() {
            this.unSelectPass();
            if (this.reject.isRejected) {
                return;
            }
            this.reject.isRejected = true;
            this.reject.onRejected = true;
            setTimeout(function (obj) {
                obj.reject.onRejected = false;
            }, 1000, this);
        },
        unSelectReject() {
            this.reject.isRejected = false;
            this.reject.onRejected = false;
        },

        async onClickSubmit() {
            if (this.onSubmit) {
                return;
            }

            this.onSubmit = true;
            setTimeout(function (obj) {
                obj.onSubmit = false;
            }, 1000, this);

            if (!this.pass.isPassed && !this.reject.isRejected) {
                this.$message.info("请选择是否通过哦");
                return;
            }

            const input = this.$refs.input;
            const text = input.value.trim();
            if (text == '') {
                this.$message.info("请记得留下你的评语哦");
                return;
            }

            await this.requestReviewPaper(this.paper.pid, this.pass.isPassed, text);

            input.value = '';
        },

        ////////////////////////////////////////////////////////////////////////
        //  Requests
        ////////////////////////////////////////////////////////////////////////
        async requestPaper(pid) {
            await this.$http.get('api/v1/papers/review/info', {
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

        async requestFavoriteStatus(pid) {
            await this.$http.get('api/v1/papers/action/isfavorite', {
                params: {
                    pid: pid
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    // this.$message.error(data.meta.msg);
                    this.isFavorite = false;
                } else {
                    this.isFavorite = data.data.value;
                }
            }).catch(err => {
                console.log(err);
            });
        },

        async requestCite(pid) {
            var cite = await this.$http.get('api/v1/papers/action/cite', {
                params: {
                    pid: pid
                }
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                    return null
                }
                return data.data.cite;
            }).catch(err => {
                console.log(err);
                return null;
            });

            return cite;
        },

        async requestFavoritePaper(pid) {
            if (this.isFavorite) {
                return;
            }

            await this.$http.post('/api/v1/papers/action/favorite', {
                pid: this.paper.pid
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                } else {
                    this.isFavorite = true;
                    this.$message.success(data.meta.msg);
                }
            }).catch(err => {
                this.$message.error("Network error, try again later.");
                console.log(err);
            });
        },
        async requestUnfavoritePaper(pid) {
            if (!this.isFavorite) {
                return;
            }

            await this.$http.post('/api/v1/papers/action/unfavorite', {
                pid: this.paper.pid
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                } else {
                    this.isFavorite = false;
                    this.$message.success(data.meta.msg);
                }
            }).catch(err => {
                this.$message.error("Network error, try again later.");
                console.log(err);
            });
        },

        async requestDownloadPaper(pid) {
            await this.$http.get('api/v1/papers/download/file', {
                params: {
                    pid: pid
                },
                responseType: 'blob'
            }).then(res => {
                const filename = this.paper.attr.title + '.pdf';
                const contentType = res.headers['content-type'];
                download(res.data, filename, contentType);
                // window.open(URL.createObjectURL(res.data), '_blank');
            }).catch(err => {
                console.log(err);
            });
        },

        async requestRelatedPapers() {
            var data = {
                ps: 11,
                p: 1,
                advanced: true,
                cond: []
            };
            for (var i = 0; i < this.paper.attr.keywords.length; i++) {
                var cond = {
                    mode: "or",
                    field: "keywords",
                    key: this.paper.attr.keywords[i]
                };
                data.cond.push(cond);
            }
            await this.$http.post('api/v1/papers/search/query', data).then(res => {
                var data = res.data;
                if (data.meta.status != 0) {
                    return;
                }
                var papers = data.data.papers;
                for (var i = 0; i < papers.length; i++) {
                    if (papers[i].pid == this.paper.pid) {
                        continue;
                    }
                    this.relatedPapers.push(papers[i]);
                }
                this.key++;
            }).catch(err => {
                console.log(err);
            });
        },

        async requestReviewPaper(pid, status, comment) {
            await this.$http.post('api/v1/papers/review/review', {
                pid: pid,
                status: status,
                comment: comment
            }).then(res => {
                var data = res.data;
                console.log(data);
                if (data.meta.status != 0) {
                    this.$message.error(data.meta.msg);
                    return;
                }
                this.$message.success("论文审核完成");
                setTimeout(this.goBack, 2000);
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style>
@import '../assets/css/paper.css';
@import '../assets/css/animate.css';
@import '../assets/css/review.css';
</style>
