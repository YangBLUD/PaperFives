<template>
    <el-row>
        <el-col :span="8">
            <!-- 个人名片 -->
            <h3 class="page-title">我</h3>
            <el-card class="box-card">
                <div class="user">
                    <img :src="'http://81.70.161.76:5000' + this.userProfile.avatar" />
                    <div>
                        <p class="name">{{ this.userProfile.username }}</p>
                        <p class="access">{{this.userProfile.role === 1 ? '用户' : '学者'}}</p>
                    </div>
                </div>
            </el-card>

            <!-- 关注列表 -->
            <el-row :gutter="20" class="follow-list">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="height: auto; width: 502px;">
                    <el-tab-pane name="first">
                        <span slot="label" style="font-size:20px; font-weight: 700;">关注</span>
                        <template v-if="followerList.length > 0">
                            <div v-for="(item, index) in followerList" :key="index">
                                <el-card shadow="hover" class="follow-item">
                                    <div class="follow-info">
                                        <!-- 用户头像 -->
                                        <div>
                                            <el-avatar :src="'http://81.70.161.76:5000' + item.avatar" size="90"
                                                :border="false"></el-avatar>
                                        </div>
                                        <!-- 用户名 -->
                                        <div class="card_name">{{ item.username }}</div>
                                        <!-- 关注操作 -->
                                        <el-button type="danger" size="small" @click="removeFollow(index)">取消关注</el-button>
                                    </div>
                                </el-card>
                            </div>
                        </template>
                        <template v-else>
                            <el-col :span="24">
                                <br><br>
                                <el-empty description="无关注用户" :image-size="250"></el-empty>
                            </el-col>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane name="second">
                        <span slot="label" style="font-size:20px; font-weight: 700;">粉丝</span>
                        <template v-if="followeeList.length > 0">
                            <div v-for="(item, index) in followeeList" :key="index">
                                <el-card shadow="hover" class="follow-item">
                                    <div class="follow-info">
                                        <!-- 用户头像 -->
                                        <div>
                                            <el-avatar :src="'http://81.70.161.76:5000' + item.avatar" size="90"
                                                :border="false"></el-avatar>
                                        </div>
                                        <!-- 用户名 -->
                                        <div class="card_name">{{ item.username }}</div>
                                        <!-- 访问页面 -->
                                        <el-button type="success" size="small"
                                            @click="gotoProfile(item.uid)">访问主页</el-button>
                                    </div>
                                </el-card>
                            </div>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </el-col>

        <el-col :span="16" style="padding-left: 30px">
            <h3 class="page-title">我的论文</h3>
            <!-- 论文列表 -->
            <el-row :gutter="20" class="paper-list">
                <template v-if="paperList.length > 0">
                    <el-col :span="24" v-for="(item, index) in paperList" :key="index">
                        <el-card shadow="hover" class="papaer-item">
                            <!-- 查看操作 -->
                            <div class="paper-action">
                                <el-button type="primary" size="small" @click="">查看论文</el-button>
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

            <h3 class="page-title">我的统计</h3>
            <div class="graph">
                <el-card style="height: 330px">
                    <div class="echart" id="mychart1" :style="myChartStyle"></div>
                </el-card>
                <el-card style="height: 330px">
                    <div class="echart" id="mychart2" :style="myChartStyle"></div>
                </el-card>
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
            paperList: [],
            xData: ["1990s", "2000s", "2010s", "2020s"], //横坐标
            yData: [23, 24, 18, 25], //数据
            myChartStyle: { float: "left", width: "90%", height: "280px" }, //图表样式
            activeName: 'first'
        };
    },
    mounted() {
        this.initEcharts();
        this.getUserProfile();
        this.getFollower();
        this.getFollowee();
    },
    methods: {
        async getUserProfile() {
            await this.$http.get('users/profile/user', {
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
            await this.$http.get('users/favorite/followers', {
                params: {
                    uid: 5
                }
            })
                .then(res => {
                    console.log(res);
                    this.followerList = res.data.data.list;
                }).catch(err => {
                    console.log(err);
                })
        },
        async getFollowee() {
            await this.$http.get('users/favorite/followees', {
                params: {
                    uid: 1
                }
            })
                .then(res => {
                    console.log(res);
                    this.followeeList = res.data.data.list;
                }).catch(err => {
                    console.log(err);
                })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        removeFollow(index) {
            this.followList.splice(index, 1);
        },
        gotoProfile(id) {
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: id
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
.user {
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .name {
        font-size: 32px;
        margin-bottom: 10px;
        width: 50px;
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
        flex: 1;
    }

    .card_name {
        margin-left: 20px;
        width: 50px;
    }
}

::v-deep .el-card__body {
    width: 500px;
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
    height: 350px;
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
}
</style>
  