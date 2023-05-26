<template>
    <!-- 页面框架 -->
    <el-row class="border">
        <el-col :span="8">
            <!-- 个人名片 -->
            <h3 class="page-title">我</h3>
            <el-card class="box-card">
                <div class="user">
                    <img :src="'http://81.70.161.76:5000' + this.userProfile.avatar" />
                    <div>
                        <p class="name">{{ this.userProfile.username }}</p>
                        <p class="access">{{ this.userProfile.role === 1 ? '用户' : '学者' }}</p>
                    </div>
                </div>
            </el-card>

            <!-- 关注列表 -->
            <el-row :gutter="20" class="follow-list">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="height: auto; width: auto;">
                    <el-tab-pane name="first">
                        <span slot="label" style="font-size:20px; font-weight: 700;">关注</span>
                        <!-- 有关注 -->
                        <template v-if="followeeList.length > 0">
                            <div v-for="(item, index) in      newList     " :key="index">
                                <el-card shadow="hover" class="follow-item">
                                    <div class="follow-info">
                                        <!-- 用户头像 -->
                                        <div @click="gotoProfile(item.uid)">
                                            <el-avatar :src="'http://81.70.161.76:5000' + item.avatar" size="90"
                                                :border="false" class="avatar-box"></el-avatar>
                                        </div>

                                        <!-- 用户名 -->
                                        <div class="card_name" @click="gotoProfile(item.uid)">{{
                                            item.username }}</div>
                                        <!-- 关注操作 -->
                                        <div class="follow-tag">
                                            <el-button v-if="item.isFollowed" type="danger" size="small"
                                                @click="removeFollower(item.uid, index)">
                                                取消关注
                                            </el-button>
                                            <el-button v-else type="success" size="small"
                                                @click="followUser(item.uid, index)" style="width: 79px;">
                                                关注
                                            </el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </template>
                        <!-- 无关注 -->
                        <template v-else>
                            <el-col :span="24">
                                <br><br>
                                <el-empty description="无关注用户" :image-size="250"></el-empty>
                            </el-col>
                        </template>
                    </el-tab-pane>

                    <!-- 粉丝列表 -->
                    <el-tab-pane name="second">
                        <span slot="label" style="font-size:20px; font-weight: 700;">粉丝</span>
                        <!-- 有粉丝 -->
                        <template v-if="followerList.length > 0">
                            <div v-for="(     item, index     ) in      followerList     " :key="index">
                                <el-card shadow="hover" class="follow-item">
                                    <div class="follow-info">
                                        <!-- 用户头像 -->
                                        <div @click="gotoProfile(item.uid)">
                                            <el-avatar :src="'http://81.70.161.76:5000' + item.avatar" size="90"
                                                :border="false" class="avatar-box"></el-avatar>
                                        </div>
                                        <!-- 用户名 -->
                                        <div class="card_name" @click="gotoProfile(item.uid)">{{
                                            item.username }}</div>
                                    </div>
                                </el-card>
                            </div>
                        </template>
                        <!-- 无粉丝 -->
                        <template v-else>
                            <el-col :span="24">
                                <br><br>
                                <el-empty description="无粉丝" :image-size="250"></el-empty>
                            </el-col>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </el-col>

        <!-- 论文列表 -->
        <el-col :span="16" style="padding-left: 30px">
            <h3 class="page-title">我的论文</h3>
            <!-- 论文列表 -->
            <el-row :gutter="20" class="paper-list">
                <template v-if="paperList.length > 0">
                    <el-col :span="24" v-for="(     item, index     ) in      paperList     " :key="index">
                        <el-card shadow="hover" class="papaer-item">
                            <!-- 查看操作 -->
                            <div class="paper-action">
                                <el-button type="primary" size="small" @click=" ">查看论文</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </template>
                <template v-else>
                    <el-col :span="24">
                        <el-empty description="无论文数据" :image-size="250"></el-empty>
                    </el-col>
                </template>
            </el-row>

            <!-- 我的统计 -->
            <h3 class="page-title">我的统计</h3>
            <div class="graph">
                <el-carousel :interval="4000" type="card" height="330px" style="width: 1000px;">
                    <el-carousel-item style="width: 500px;">
                        <el-card style="height: 330px; width: 500px;">
                            <div class="echart" id="mychart1" :style="myChartStyle"></div>
                        </el-card>
                    </el-carousel-item>
                    <el-carousel-item style="width: 500px;">
                        <el-card style="height: 330px; width: 500px;">
                            <div class="echart" id="mychart2" :style="myChartStyle"></div>
                        </el-card>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-col>
    </el-row>
</template>
  
<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            userProfile: {},
            followerList: [],
            followeeList: [],
            newList: [],
            paperList: [],
            followeeTag: false,
            xData: ["1990s", "2000s", "2010s", "2020s"], //横坐标
            yData: [23, 24, 18, 25], //数据
            myChartStyle: { float: "left", width: "90%", height: "280px" }, //图表样式
            activeName: 'first'
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initEcharts();
            this.getFollower();
            this.getFollowee();
        });
        this.getUserProfile();
    },
    methods: {
        async getUserProfile() {
            await this.$http.get('api/v1/users/profile/user', {
                params: {
                    mode: 'all',
                    uid: 1
                }
            })
                .then(res => {
                    console.log(res);
                    this.userProfile = res.data.data;
                }).catch(err => {
                    console.log(err);
                })
        },
        async getFollower() {
            await this.$http.get('api/v1/users/favorite/followers', {
                params: {
                    uid: 1
                }
            })
                .then(res => {
                    this.followerList = res.data.data.list;
                }).catch(err => {
                    console.log(err);
                })
        },
        async getFollowee() {
            await this.$http.get('api/v1/users/favorite/followees', {
                params: {
                    uid: 1
                }
            })
                .then(res => {
                    this.followeeList = res.data.data.list;
                    this.newList = this.followeeList.map(item => {
                        return {
                            ...item,
                            isFollowed: true
                        };
                    });
                }).catch(err => {
                    console.log(err);
                })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        async removeFollower(id, index) {
            // this.followeeList.splice(index, 1)
            this.newList[index].isFollowed = !this.newList[index].isFollowed;
            await this.$http.post('api/v1/users/favorite/unfollow', {
                uid: id
            })
                .then(res => {
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            // console.log(document.getElementById("pane-first").getElementsByClassName("follow-tag"));
            // console.log(index)
            // console.log(document.getElementById("pane-first").getElementsByClassName("follow-tag")[index]);
            // pair = document.getElementById("pane-first").getElementsByClassName("follow-tag")[index];
            // console.log(pair)
            // .getElementsByTagName("button")
            // pair[0].classList.add("hidden")
            // pair[1].classList.remove("hidden"))
        },
        async isFollowee(id) {
            await this.$http.get('api/v1/users/favorite/isfollowee', {
                params: {
                    uid: id
                }
            })
                .then(res => {
                    console.log(res);
                    this.followeeTag = res.data.data.value
                }).catch(err => {
                    console.log(err);
                })
        },
        async followUser(id, index) {
            this.newList[index].isFollowed = !this.newList[index].isFollowed;
            await this.$http.post('api/v1/users/favorite/follow', {
                uid: id
            })
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async gotoProfile(id) {
            await this.isFollowee(id)
            console.log(this.followeeTag)
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: id,
                    status: this.followeeTag
                }
            })
        },

        initEcharts() {
            // 基本柱状图
            const option1 = {
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
                        type: "bar", //形状为柱状图
                        data: this.yData,
                        barWidth: 30,
                        itemStyle: {
                            color: "#2ec7c9"
                        }
                    }
                ]
            };

            const option2 = {
                legend: {
                    // 图例
                    data: ["OS", "OO", "DB", "SE", "AI"],
                    right: "10%",
                    top: "50%",
                    orient: "vertical",
                    textStyle: {
                        color: "#666",
                        fontSize: 14
                    },
                    itemWidth: 16,
                    itemHeight: 16,
                    itemGap: 20
                },
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
                        center: ["50%", "55%"],
                        label: {
                            show: true,
                            fontSize: 16,
                            formatter: "{b} {d}%"
                        },
                        labelLine: {
                            length: 5,
                            length2: 10,
                            lineStyle: {
                                width: 1
                            }
                        },
                        data: [
                            {
                                value: 463,
                                name: "OS"
                            },
                            {
                                value: 395,
                                name: "OO"
                            },
                            {
                                value: 157,
                                name: "DB"
                            },
                            {
                                value: 149,
                                name: "SE"
                            },
                            {
                                value: 147,
                                name: "AI"
                            }
                        ],
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
        }
    }
};

</script>

  
<style lang="less" scoped>
.border {
    max-width: max-content;
}

.follow-item:hover {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
}


.avatar-box {
    position: relative;
    transition: all 0.3s ease-in-out;
    /* 添加过渡效果 */
    transform: scale(1);
    /* 设置默认的缩放比例 */
    opacity: 0.8;
    /* 设置默认的透明度 */
}

.avatar-box:hover {
    cursor: pointer;
    position: relative;
    transform: scale(1.2);
    /* 鼠标移动到头像上时，放大 20% */
    opacity: 1;
    /* 鼠标移动到头像上时，使透明度设置为 1 */
}

.user {
    display: flex;
    align-items: center;
    width: auto;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .name {
        font-size: 32px;
        margin-bottom: 10px;
        width: auto;
    }

    .access {
        color: gray;
    }
}

.paper-action .el-button {
    margin-left: 800px;
}

.el-button {
    margin-left: 250px;
}

.page-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.follow-list {
    margin-top: 20px;
    padding-left: 10px;
    height: 550px;
    overflow-y: visible;
    overflow-x: hidden;
}

.follow-item {
    display: flex;
    display: inline-block;
    align-items: center;
    // padding: 20px;
    width: 100%;
    margin-bottom: 10px;

    .follow-info {
        display: flex;
        align-items: center;
        width: auto;

        .follow-tag .hidden {
            display: flex;
            justify-content: flex-end;
            display: none;
        }
    }

    .card_name {
        margin-left: 20px;
        width: 50px;
    }

    .card_name:hover {
        cursor: pointer;
    }
}

::v-deep .el-card__body {
    width: auto;
}

.follow-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}

.paper-list {
    height: auto;
    overflow-y: auto;
}

.paper-item {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;

    .follow-info {
        display: flex;
        align-items: center;
        flex: 1;
    }
}

.follow-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}</style>
  