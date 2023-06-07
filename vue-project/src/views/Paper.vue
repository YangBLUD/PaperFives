<template>
    <div class="paper-border">
        <div class="paper-wrapper">
            <!-- title -->
            <div class="section"><span>title</span></div>
            <div class="title">
                <h1 class="mathjax">{{ title }}</h1>
            </div>

            <hr class="split" />

            <!-- authors -->
            <div class="section"><span>authors</span></div>
            <div class="author-list horizontal-list">
                <div class="author-item horizontal-list-item">
                    <div class="avatar">
                        <img src="http://81.70.161.76:5000/media/avatar/default.png" />
                    </div>
                    <div class="name clickable">Tony long long Skywalker</div>
                    <i class="fa-regular fa-envelope"></i>
                    <div class="tooltip">
                        <span class="email">12312312185@qq.com</span>
                        <div class="box"></div>
                    </div>
                </div>
                <div v-for="i in 5" class="author-item horizontal-list-item">
                    <div class="avatar">
                        <img src="http://81.70.161.76:5000/media/avatar/default.png" />
                    </div>
                    <div class="name">Tony Skywalker</div>
                    <i class="fa-regular fa-envelope"></i>
                    <div class="tooltip">
                        <span class="email">185@qq.com</span>
                        <div class="box"></div>
                    </div>
                </div>
            </div>

            <hr class="split" />

            <!-- keywords -->
            <div class="section"><span>keywords</span></div>
            <div class="keywords-list horizontal-list">
                <div class="keyword"><i class="fa-solid fa-circle"></i><span>computer vision</span></div>
                <div class="keyword"><i class="fa-solid fa-circle"></i><span>unreal engine</span></div>
                <div class="keyword"><i class="fa-solid fa-circle"></i><span>software engineering</span></div>
            </div>

            <hr class="split" />

            <!-- time -->
            <div class="section"><span>update history</span></div>
            <div class="time-wrapper horizontal-list">
                <div class="time horizontal-list-item">
                    <span class="time-type">Publish Time: </span>
                    <span>2023-01-01</span>
                </div>
                <div class="time horizontal-list-item">
                    <span class="time-type">Last Update: </span>
                    <span>2023-01-02</span>
                </div>
            </div>

            <hr class="split" />

            <!-- shards -->
            <div class="shard-wrapper">
                <div class="stat-wrapper horizontal-list">
                    <div class="stat" title="Clicks">
                        <i class="fa-regular fa-eye"></i>
                        <span>99+</span>
                    </div>
                    <div class="stat" title="Cites">
                        <i class="fa-solid fa-quote-left"></i>
                        <span>99+</span>
                    </div>
                    <div class="stat" title="Downloads">
                        <i class="fa-regular fa-circle-down"></i>
                        <span>99+</span>
                    </div>
                </div>
                <div class="action-wrapper horizontal-list">
                    <div class="action" title="Cite">
                        <i class="fa-solid fa-quote-right"></i>
                    </div>
                    <div class="action" title="Share">
                        <i class="fa-regular fa-share-from-square"></i>
                    </div>
                    <div class="action" title="Add to bookmark">
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                    <div class="action" title="Remove from bookmark">
                        <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <div class="action" title="Downloads">
                        <i class="fa-solid fa-file-arrow-down"></i>
                    </div>
                </div>

            </div>

            <hr class="split" />

            <!-- abstract -->
            <div class="section"><span>abstract</span></div>
            <div class="abstract-wrapper">
                <p class="mathjax">{{ formula }}</p>
            </div>

            <hr class="split">
            <!-- reference -->
            <div class="section"><span>reference</span></div>
            <div class="ref-list">
                <div class="ref">
                    <span class="bullet">[1]</span>
                    <span class="text">Lars Arge, Mark De Berg, Herman Haverkort, and Ke Yi. 2008. The priority R-tree: A
                        practically efficient and worst-case optimal R-tree. ACM Transactions on Algorithms (TALG) 4, 1
                        (2008), 9.</span>
                </div>
                <hr />
                <div class="ref">
                    <span class="bullet">[2]</span>
                    <span class="text">Lars Arge, Mark De Berg, Herman Haverkort, and Ke Yi. 2008. The priority R-tree: A
                        practically efficient and worst-case optimal R-tree. ACM Transactions on Algorithms (TALG) 4, 1
                        (2008), 9.</span>
                </div>
                <hr />
                <div class="ref">
                    <span class="bullet">[3]</span>
                    <span class="text">Lars Arge, Mark De Berg, Herman Haverkort, and Ke Yi. 2008. The priority R-tree: A
                        practically efficient and worst-case optimal R-tree. ACM Transactions on Algorithms (TALG) 4, 1
                        (2008), 9.</span>
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
            title: String.raw`This $ x_a $  Is  The Title of a Paper This Is The Title of a Paper`,
            formula: String.raw`We $ x_a $ study the basic question of characterizing which boundary homeomorphisms of the unit sphere can be
                    extended to a Sobolev homeomorphism of the interior in 3D space. While the planar variants of this
                    problem are well-understood, completely new and direct ways of constructing an extension are required in
                    3D. We prove, among other things, that a Sobolev homeomorphism $\varphi \colon \mathbb R^2 \to \mathbb
                    R^2$ in $W_{loc}^{1,p} (\mathbb R^2 , \mathbb R^2)$ for some $p\in [1,\infty )$ admits a homeomorphic
                    extension $h \colon \mathbb R^3 \to \mathbb R^3$ in $W_{loc}^{1,q} (\mathbb R^3, \mathbb R^3) $ for
                    $1\le q < \frac{3}{2}p$. Such an extension result is nearly sharp, as the bound $q=\frac{3}{2}p$ cannot
                        be improved due to the H\"older embedding. The case $q=3$ gains an additional interest as it also
                        provides an $L^1$-variant of the celebrated Beurling-Ahlfors extension result.`
        }
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
        initMathJax({}, this.onMathJaxReady);
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
        onMathJaxReady() {
            // const math = this.$refs.math
            const maths = document.getElementsByClassName('mathjax');
            for (var i = 0; i < maths.length; i++) {
                // console.log(maths[i]);
                renderByMathjax(maths[i]).catch(err => {
                    console.log(err)
                });
            }
        }
    }
}
</script>

<style>@import '../assets/css/paper.css';
@import '../assets/css/animate.css';</style>
