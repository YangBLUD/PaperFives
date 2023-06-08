<template>
    <el-row class="border">
        <!-- 个人名片 -->
        <div style="display: flex; justify-content: center; align-items: center; padding-top: 30px;">
            <el-card class="box-card" style="margin: 0 auto; text-align: left;">
                <el-col :span="22">
                    <div class="user">
                        <img :src="'http://81.70.161.76:5000' + this.userProfile.avatar" />
                        <div>
                            <p class="name" v-if="this.userAttr.sex === 1">
                                {{ this.userProfile.username }}
                                <i class="el-icon-male" style="color: #409EFF; font-weight: 700;"></i>
                            </p>
                            <p class="name" v-else-if="this.userAttr.sex === 2">
                                {{ this.userProfile.username }}
                                <i class="el-icon-female" style="color:#FF69B4; font-weight: 700;"></i>
                            </p>
                            <p class="name" v-else>
                                {{ this.userProfile.username }}
                            </p>
                            <!-- <p class="access">{{ this.userProfile.role === 1 ? '用户' : '学者' }}</p> -->
                            <template v-if="this.userAttr.institute">
                                <p class="institute">{{ this.userAttr.institute }}</p>
                                <p v-if="this.userAttr.motto" class="motto">{{ this.userAttr.motto }}</p>
                                <p v-else class="motto">&nbsp;</p>
                            </template>
                            <template v-else>
                                <p class="institute">&nbsp;</p>
                                <p v-if="this.userAttr.motto" class="motto">{{ this.userAttr.motto }}</p>
                                <p v-else class="motto">&nbsp;</p>
                            </template>
                        </div>
                    </div>
                </el-col>
                <el-col v-show="isFollowed !== null" :span="2"
                    style="display: flex; justify-content: center; align-items: center;">
                    <div>
                        <i v-if="this.isFollowed" class="fa-solid fa-star" style="font-size:70px; color: #FFBE00;"
                            @click="removeFollower()"></i>
                        <i v-else class="fa-regular fa-star fa-beat" style="font-size:70px; color: #FFBE00;"
                            @click="followUser()"></i>
                    </div>
                </el-col>
                <el-col :span="2" style="padding-top: 20px;">
                    <el-button type="success" size="normal" class="status" style="width: 100px;"><i
                            class="fa-sharp fa-regular fa-comment fa-fade" style="font-size: 30px;"
                            @click="gotoMessage()"></i></el-button>
                </el-col>
            </el-card>
        </div>


        <!-- 最火论文 -->
        <div class="paper-col-wrapper">
            <el-col :span="12" class="left-col">
                <template v-if="this.truePaperList.length > 0">
                    <el-col v-for="(item, index) in paperList" :key="index">
                        <el-card v-if="item.pid === hot" shadow="hover">
                            <div style="padding-top: 20px; max-width: 600px;">
                                <i class="fa-brands fa-hotjar fa-beat" style="color: red; font-size: 50px;"></i>
                                <span class="hot">&nbsp;&nbsp;RANK：{{ rank }}&nbsp;&nbsp;</span>
                                <i class="fa-brands fa-hotjar fa-beat" style="color: red; font-size: 50px;"></i>
                            </div>
                            <span class="paper_name_hot" @click="gotoPaper(item.pid)" style="max-width: 600px;">
                                {{ item.attr.title }}
                            </span>
                            <div class="content">
                                <div>
                                    <span v-for="(author, index) in item.authors">
                                        <span v-if="author.uid != 0" @click="gotoProfile(author.uid)" class="author-name">{{
                                            author.name }}</span>
                                        <span v-else class="author-not-exist">{{ author.name }}</span>
                                        <span v-if="index < item.authors.length - 1"
                                            style="color: #A0A0A0; font-size: 14px"> /
                                        </span>
                                    </span>
                                    <span class="publish-year"> · {{ item.attr.publish_date }}</span>
                                </div>
                                <div>
                                    <span v-for="(keyword) in item.attr.keywords" class="abstract">
                                        ●{{ keyword }}&nbsp;&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div>
                                    <span class="abstract">{{ item.attr.abstract }}</span>
                                </div>
                                <div class="citation-count">
                                    <span>{{ item.stat.cites }}&nbsp;被引用</span>
                                    <span>&nbsp;·&nbsp;{{ item.stat.downloads }}&nbsp;被收藏</span>
                                    <span>&nbsp;·&nbsp;{{ item.stat.favorites }}&nbsp;下载量</span>
                                    <span>&nbsp;·&nbsp;{{ item.stat.clicks }}&nbsp;点击量</span>
                                </div>
                            </div>
                            <br>
                            <span>
                                <i class="fa-solid fa-fire-flame-curved fa-bounce" style="color: red; font-size: 40px;"></i>
                            </span>
                        </el-card>
                    </el-col>
                </template>
            </el-col>

            <el-col :span="12" class="right-col">
                <!-- 论文列表 -->
                <el-row :gutter="20" class="paper-list">
                    <template v-if="paperList.length > 0">
                        <el-col v-for="(item, index) in truePaperList" :key="index">
                            <el-card shadow="hover" class="paper-item">
                                <div class="wrapper">
                                    <div v-show="showCard[index]">
                                        <div class="paper-item-title">
                                            <span class="paper_name" @click="gotoPaper(item.pid)"
                                                style="white-space: nowrap;">{{ item.attr.title
                                                }}</span>
                                            <el-button class="shrink" icon="el-icon-arrow-left"
                                                @click="$set(showCard, index, false)" size="mini"></el-button>
                                        </div>
                                        <div class="content">
                                            <div>
                                                <span v-for="(author, index) in item.authors">
                                                    <span v-if="author.uid != 0" @click="gotoProfile(author.uid)"
                                                        class="author-name">{{
                                                            author.name }}</span>
                                                    <span v-else class="author-not-exist">{{ author.name }}</span>
                                                    <span v-if="index < item.authors.length - 1"
                                                        style="color: #A0A0A0; font-size: 14px"> / </span>
                                                </span>
                                                <span class="publish-year"> · {{ item.attr.publish_date }}</span>
                                            </div>
                                            <div>
                                                <span v-for="(keyword) in item.attr.keywords" class="abstract">
                                                    ●{{ keyword }}&nbsp;&nbsp;&nbsp;
                                                </span>
                                            </div>
                                            <div style="text-align:left;margin-top:10px;">
                                                <span class="abstract">{{ item.attr.abstract }}</span>
                                            </div>
                                            <div class="citation-count">
                                                <span>{{ item.stat.cites }}&nbsp;被引用</span>
                                                <span>&nbsp;·&nbsp;{{ item.stat.downloads }}&nbsp;被收藏</span>
                                                <span>&nbsp;·&nbsp;{{ item.stat.favorites }}&nbsp;下载量</span>
                                                <span>&nbsp;·&nbsp;{{ item.stat.clicks }}&nbsp;点击量</span>
                                            </div>
                                        </div>
                                        <div v-show="!showCard[index]">
                                            {{ item.attr.title }}
                                        </div>
                                    </div>
                                    <div v-show="!showCard[index]">
                                        <div class="paper-content">
                                            <span class="paper_name_init" @click="gotoPaper(item.pid)">{{ item.attr.title
                                            }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <i v-if="item.lead" class="fa-solid fa-medal"
                                                style="color: #FFB90F; font-size: 30px;"></i>
                                            <el-button icon="el-icon-view" size="mini" circle
                                                @click="$set(showCard, index, true)"></el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </template>
                </el-row>
            </el-col>
        </div>

        <!-- 图表部分 -->
        <el-col class="graph-col" :span="24" v-if="paperList.length > 0">
            <el-col :span="12" class="left-col">
                <el-card style="height: 350px;">
                    <div class="echart" id="mychart1" :style="myChartStyle1"></div>
                </el-card>
            </el-col>
            <el-col :span="12" class="right-col">
                <el-card style="height: 350px;">
                    <div class="echart" id="mychart2" :style="myChartStyle2"></div>
                </el-card>
            </el-col>
        </el-col>
    </el-row>
</template>
  
<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            isFollowed: null,
            userProfile: {},
            userAttr: {},
            paperList: [],
            truePaperList: [],
            paperNum: 0,
            showCard: [],
            hot: 0,
            rank: 0,
            xData: [], //横坐标
            yData_1: [], //数据
            yData_2: [], //数据
            Data: [],
            legend: [],
            myChartStyle1: { float: "left", width: "100%", height: "350px" }, //图表样式
            myChartStyle2: { float: "left", width: "100%", height: "400px" }, //图表样式
            activeName: 'first'
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initEcharts();
            this.getUserProfile();
            this.isFollowee();
            this.paperList.forEach(() => {
                this.$set(this.showCard, this.showCard.length, false);
            });
        });
    },
    methods: {
        async getUserProfile() {
            await this.$http.get('api/v1/users/profile/user', {
                params: {
                    mode: 'all',
                    uid: this.$route.query.uid
                }
            })
                .then(res => {
                    // console.log(res);
                    this.userProfile = res.data.data;
                    this.userAttr = res.data.data.attr;
                }).catch(err => {
                    console.log(err);
                })
        },
        async followUser() {
            this.isFollowed = !this.isFollowed;
            await this.$http.post('api/v1/users/favorite/follow', {
                uid: this.$route.query.uid
            })
                .then(res => {
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async removeFollower() {
            this.isFollowed = !this.isFollowed;
            await this.$http.post('api/v1/users/favorite/unfollow', {
                uid: this.$route.query.uid
            })
                .then(res => {
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async isFollowee() {
            await this.$http.get('api/v1/users/favorite/isfollowee', {
                params: {
                    uid: this.$route.query.uid
                }
            })
                .then(res => {
                    // console.log(res);
                    this.isFollowed = res.data.data.value
                }).catch(err => {
                    console.log(err);
                })
        },
        async getPaperlist() {
            await this.$http.get('api/v1/papers/get/papers', {
                params: {
                    uid: this.$route.query.uid
                }
            })
                .then(res => {
                    // console.log(res);
                    this.paperList = res.data.data.papers;
                    this.paperNum = res.data.data.total;
                    this.truePaperList = this.paperList.filter(item => item.status === 5);
                    this.hot = res.data.data.hot;
                    this.rank = res.data.data.rank;
                }).catch(err => {
                    console.log(err);
                })
        },
        async gotoPaper(id) {
            this.$router.push({
                path: '/paper',
                query: {
                    pid: id,
                }
            })
        },
        async gotoProfile(id) {
            if (id != this.$route.query.uid) {
                this.$router.push({
                    path: '/visitor',
                    query: {
                        uid: id,
                    }
                })
                location.reload()
            }
            else {
                location.reload()
            }
        },
        async gotoMessage() {
            this.$router.push({
                path: '/message',
                query: {
                    uid: this.userProfile.uid
                }
            })
        },
        async getStatisticsBar() {
            await this.$http.get('api/v1/users/query/stat/bar', {
                params: {
                    uid: this.$route.query.uid
                }
            })
                .then(res => {
                    this.xData = res.data.data.stats.years;
                    this.yData_1 = res.data.data.stats.lead_cnt;
                    this.yData_2 = res.data.data.stats.co_cnt;
                }).catch(err => {
                    console.log(err);
                })
        },
        async getStatisticsPie() {
            await this.$http.get('api/v1/users/query/stat/pie', {
                params: {
                    uid: this.$route.query.uid
                }
            })
                .then(res => {
                    this.Data = res.data.data.stats;
                    this.legend = res.data.data.legend;
                }).catch(err => {
                    console.log(err);
                })
        },
        async initEcharts() {
            await this.getPaperlist();
            await this.getStatisticsBar();
            await this.getStatisticsPie();
            if (!(this.paperList.length > 0))
                return;
            // 基本柱状图
            const option1 = {
                legend: {
                    data: ['一作', '合作'],
                    top: "10%",
                    left: "80%",
                },

                title: {
                    // 设置饼图标题，位置设为顶部居中
                    text: "论文发表记录",
                    top: "0%",
                    left: "center",
                    textStyle: {
                        color: "#333",
                        fontWeight: "bold",
                        fontFamily: "Microsoft YaHei"
                    }
                },
                grid: {
                    top: 80,
                    left: 80,
                    right: 50
                },
                xAxis: {
                    data: this.xData,
                    axisLine: {
                        lineStyle: {
                            color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#666",
                        margin: 10
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    minInterval: 1, // 设置y轴坐标的最小值为1
                    axisLine: {
                        lineStyle: {
                            color: "#999"
                        }
                    },
                    axisLabel: {
                        color: "#666",
                        margin: 10
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed"
                        }
                    }
                },
                color: ["#2ec7c9"],
                series: [
                    {
                        name: "一作",
                        type: "bar", //形状为柱状图
                        data: this.yData_1,
                        barWidth: 30,
                        itemStyle: {
                            color: "#2ec7c9"
                        }
                    },
                    {
                        name: "合作",
                        type: "bar", //形状为柱状图
                        data: this.yData_2,
                        barWidth: 30,
                        itemStyle: {
                            color: "#DCDCDC"
                        }
                    }
                ]
            };

            const option2 = {
                title: {
                    // 设置饼图标题，位置设为顶部居中
                    text: "研究领域分布",
                    top: "0%",
                    left: "center",
                    textStyle: {

                        color: "#333",
                        fontWeight: "bold",
                        fontFamily: "Microsoft YaHei"
                    }
                },
                series: [
                    {
                        type: "pie",
                        radius: ["50%", "70%"],
                        center: ["50%", "42%"],
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '25',
                                fontWeight: 'bold',
                                formatter: function (params) {
                                    return params.name + '\n' + '\n' + params.percent + '%';
                                },
                            }
                        },
                        labelLine: {
                            length: 5,
                            length2: 10,
                            lineStyle: {
                                width: 1
                            }
                        },
                        data: this.Data,
                        itemStyle: {
                            borderWidth: 10,
                            borderColor: "#fff"
                        }
                    }
                ]
            };
            const myChart1 = echarts.init(document.getElementById("mychart1"));
            myChart1.setOption(option1);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart1.resize();
            });

            const myChart2 = echarts.init(document.getElementById("mychart2"));
            myChart2.setOption(option2);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart2.resize();
            });
        },
        handleMouseMove(event) {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
        },
    }
};

</script>

  
<style lang="less" scoped>
.border {
    min-width: 1200px;
}

.box-card {
    display: flex;
    justify-content: center;
    width: 1200px;
}

.box-card::v-deep .el-card__body {
    width: 1050px;
}

.fa-star:hover {
    cursor: pointer;
}

.user {
    display: flex;
    align-items: center;
    justify-items: left;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .name {
        font-family: 'OpenSans-Bold', sans-serif;
        font-size: 35px;
        margin-bottom: 10px;
        width: 500px;
    }

    .access {
        color: gray;
    }

    .institute {
        font-family: 'OpenSans', sans-serif;
        font-size: 16px;
        margin-bottom: 10px;
        width: 500px;
        color: #0077c2;
        line-height: 1.5;
    }

    .motto {
        font-size: 16px;
        font-family: 'OpenSans', sans-serif;
        margin-bottom: 10px;
        width: 500px;
        line-height: 1.5;
    }
}

.paper-action .el-button {
    margin-left: 800px;
}

.el-button {
    margin-left: auto;
}

.page-title {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 20px;
}

.graph {
    padding-top: 50px;
    margin-left: 145px;
    height: 500px;
    padding-right: 40px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}


.left-col {
    padding-top: 50px;
    // margin-left: 145px;
    width: 600px;
    height: auto;
    padding-right: 40px;
}

.right-col {
    padding-top: 50px;
    width: 600px;
}

.hot {
    font-family: Montserrat-Black;
    color: red;
    font-size: 35px;
}

.paper_name_hot {
    font-family: 'ZillaSlab-Bold', sans-serif;
    // margin-left: 20px;
    color: black;
    font-size: 35px;
    font-weight: 800;
    /* 设置初始状态字体为普通体 */
    transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
    /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
    line-height: 1.5;
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.paper_name_hot:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: #FFC125 !important;
}

.paper_name {
    font-family: 'ZillaSlab-Bold', sans-serif;
    margin-left: 20px;
    color: black;
    font-size: 25px;
    font-weight: 800;
    /* 设置初始状态字体为普通体 */
    transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
    /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
    line-height: 1.5;
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.paper_name:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: #0077ff !important;
}

.content {
    padding: 0 20px;

    // .abstract {
    //     justify-content: left;
    //     text-align: left;
    // }
}

.paper-list {
    min-height: 600px;
    width: auto;
    overflow-y: auto;
    text-align: left !important;

    .paper-item {
        // display: flex;
        align-items: center;
        margin-bottom: 10px;

        .wrapper {
            width: 100%;
            transition: 1s;

            .paper-content {
                display: flex;
                flex-direction: row;
                align-items: center;

                .status {
                    margin-left: auto;
                    width: 8em;
                }

                .paper_name_init {
                    font-family: 'ZillaSlab-Bold', sans-serif;
                    margin-left: 20px;
                    color: black;
                    font-size: 25px;
                    max-width: 600px;
                    font-weight: 600;
                    /* 设置初始状态字体为普通体 */
                    transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
                    /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
                    white-space: nowrap;
                    /* 设置不换行 */
                    overflow: hidden;
                    /* 超出部分隐藏 */
                    text-overflow: ellipsis;
                    /* 超出部分显示省略号 */
                }

                .paper_name_init:hover {
                    cursor: pointer;
                    transform: scale(1.05);
                    color: #0077ff !important;
                }
            }

            .paper-item-title {
                display: flex;
                flex-direction: row;
                align-items: center;

                .shrink {
                    margin-left: auto;
                }
            }
        }
    }
}

.paper-list::-webkit-scrollbar {
    display: none;
}

.graph-col {
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.paper-col-wrapper {
    display: flex;
    justify-content: center;
}


</style>
  