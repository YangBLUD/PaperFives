<template>
    <!-- 页面框架 -->
    <el-row class="border">
        <!-- 左栏 -->
        <el-col :span="8" class="left-col">
            <!-- 个人名片 -->
            <el-card class="box-card">
                <div class="user">
                    <img :src="'http://81.70.161.76:5000' + this.userProfile.avatar" @click="uploadAvatar"
                        class="avatar-box" />
                    <div>
                        <p class="name">{{ this.userProfile.username }}</p>
                        <p class="access"><i class="fa-regular fa-pen-to-square" @click="editMotto"></i>&nbsp;{{ motto }}
                        </p>
                    </div>
                </div>
            </el-card>
            <el-dialog title="修改签名" :visible.sync="dialogVisible">
                <el-input v-model="newMotto" placeholder="请输入新签名" maxlength="100" show-word-limit></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveMotto">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 关注列表 -->

            <el-tabs v-model="activeName" style="height: auto; width: auto; margin-top: 20px;">
                <el-tab-pane name="followee">
                    <span slot="label" style="font-size:20px; font-weight: 700;">关注</span>
                    <!-- 有关注 -->
                    <el-row :gutter="20" class="follow-list">
                        <template v-if="followeeList.length > 0">
                            <div v-for="(item, index) in      newList     " :key="index">
                                <el-card shadow="hover" class="follow-item">
                                    <div class="follow-info">
                                        <!-- 用户头像 -->
                                        <div @click="gotoProfile(item.uid)">
                                            <el-avatar :src="'http://81.70.161.76:5000' + item.avatar"
                                                style="width: 50px; height: 50px; border-radius: 50%" :border="false"
                                                class="avatar-box"></el-avatar>
                                        </div>

                                        <!-- 用户名 -->
                                        <div class="card_name" @click="gotoProfile(item.uid)">
                                            {{ item.username }}
                                        </div>

                                        <!-- 关注操作 -->
                                        <div class="follow-tag">
                                            <el-button v-if="item.isFollowed" type="danger" size="normal"
                                                @click="removeFollower(item.uid, index)">
                                                取消关注
                                            </el-button>
                                            <el-button v-else type="success" size="normal"
                                                @click="followUser(item.uid, index)" style="width: 97px;">
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
                    </el-row>
                </el-tab-pane>

                <!-- 粉丝列表 -->
                <el-tab-pane name="follower">
                    <span slot="label" style="font-size:20px; font-weight: 700;">粉丝</span>
                    <el-row :gutter="20" class="follow-list">
                        <!-- 有粉丝 -->
                        <template v-if="followerList.length > 0">
                            <div v-for="(     item, index     ) in      followerList     " :key="index">
                                <el-card shadow="hover" class="follow-item">
                                    <div class="follow-info">
                                        <!-- 用户头像 -->
                                        <div @click="gotoProfile(item.uid)">
                                            <el-avatar :src="'http://81.70.161.76:5000' + item.avatar"
                                                style="width: 50px; height: 50px; border-radius: 50%" :border="false"
                                                class="avatar-box"></el-avatar>
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
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-col>

        <!-- 右栏 -->
        <el-col :span="16" class="right-col">
            <el-tabs v-model="activePaper" style="height: auto; width: auto;">
                <el-tab-pane name="myPaper">
                    <span slot="label" style="font-size:20px; font-weight: 700;">我的</span>
                    <!-- 论文列表 -->
                    <el-row :gutter="20" class="paper-list">
                        <template v-if="paperList.length > 0">
                            <el-col v-for="(item, index) in paperList" :key="index">
                                <el-card shadow="hover" class="paper-item">
                                    <div class="wrapper">
                                        <div v-show="showCard[index]">
                                            <div class="paper-item-title">
                                                <span class="paper_name" @click="gotoPaper(item.pid)">{{ item.attr.title
                                                }}</span>
                                                <el-button class="shrink" icon="el-icon-arrow-left"
                                                    @click="$set(showCard, index, false)" size="mini"></el-button>
                                            </div>
                                            <div class="content">
                                                <div class="authors">
                                                    <span v-for="(author, index) in item.authors" class="author-name">
                                                        <span @click="gotoProfile(author.uid)">{{ author.name }}</span>
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
                                                <span class="paper_name_init" @click="gotoPaper(item.pid)">{{
                                                    item.attr.title
                                                }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <i v-if="item.lead" class="fa-solid fa-medal"
                                                    style="color: #FFB90F; font-size: 30px;"></i>
                                                <el-button v-if="item.status === 0" type="success" size="normal"
                                                    class="status" icon="el-icon-edit">
                                                    草稿
                                                </el-button>
                                                <el-button v-else-if="item.status === 1" type="success" size="normal"
                                                    class="status" icon="el-icon-edit">
                                                    草稿
                                                </el-button>
                                                <el-button v-else-if="item.status === 2" type="warning" size="normal"
                                                    class="status" icon="el-icon-s-check">
                                                    审核中
                                                </el-button>
                                                <el-button v-else-if="item.status === 3" type="warning" size="normal"
                                                    class="status" icon="el-icon-s-check">
                                                    草稿
                                                </el-button>
                                                <el-button v-else-if="item.status === 4" type="danger" size="normal"
                                                    class="status" icon="el-icon-error">
                                                    已驳回
                                                </el-button>
                                                <el-button v-else-if="item.status === 5" type="primary" size="normal"
                                                    class="status" icon="el-icon-success">
                                                    已发表
                                                </el-button>
                                                <el-button icon="el-icon-view" size="mini" circle
                                                    @click="$set(showCard, index, true)"></el-button>
                                            </div>
                                        </div>
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
                </el-tab-pane>

                <el-tab-pane name="favoritePaper">
                    <span slot="label" style="font-size:20px; font-weight: 700;">收藏</span>
                    <el-row :gutter="20" class="paper-list">
                        <template v-if="newListPaper.length > 0">
                            <el-col v-for="(item, index) in newListPaper" :key="index">
                                <el-card shadow="hover" class="paper-item">
                                    <div class="wrapper">
                                        <div v-show="showCardFav[index]">
                                            <div class="paper-item-title">
                                                <span class="paper_name" @click="gotoPaper(item.pid)">{{ item.attr.title
                                                }}</span>
                                                <el-button class="shrink" icon="el-icon-arrow-left"
                                                    @click="$set(showCardFav, index, false)" size="mini"></el-button>
                                            </div>
                                            <div class="content">
                                                <div class="authors">
                                                    <span v-for="(author, index) in item.authors" class="author-name">
                                                        <span @click="gotoProfile(author.uid)">{{ author.name }}</span>
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
                                            <div v-show="!showCardFav[index]">
                                                {{ item.attr.title }}
                                            </div>
                                        </div>
                                        <div v-show="!showCardFav[index]">
                                            <div class="paper-content">
                                                <span class="paper_name_init" @click="gotoPaper(item.pid)"
                                                    style="max-width: 770px;">{{
                                                        item.attr.title
                                                    }}</span>
                                                <i v-if="item.isFavorite" class="fa-solid fa-star"
                                                    style="font-size:35px; color: #FFBE00; margin-left: auto; padding-right: 8px;"
                                                    @click="removeFavorite(item.pid, index)"></i>
                                                <i v-else class="fa-regular fa-star"
                                                    style="font-size:35px; color: #FFBE00; margin-left: auto;padding-right: 8px;"
                                                    @click="favoritePaper(item.pid, index)"></i>
                                                <el-button icon="el-icon-view" size="mini" circle
                                                    @click="$set(showCardFav, index, true)"></el-button>
                                            </div>
                                        </div>
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
                </el-tab-pane>
            </el-tabs>

            <!-- 我的统计 -->
            <div class="graph">
                <el-carousel type="card" height="330px" style="width: 1000px;">
                    <el-carousel-item style="width: 500px;">
                        <el-card style="height: 350px; width: 500px;">
                            <div class="echart" id="mychart1" :style="myChartStyle1"></div>
                        </el-card>
                    </el-carousel-item>
                    <el-carousel-item style="width: 500px;">
                        <el-card style="height: 350px; width: 500px;">
                            <div class="echart" id="mychart2" :style="myChartStyle2"></div>
                        </el-card>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import * as echarts from 'echarts'
import Articles from "../components/hot/Articles.vue";
export default {
    components: { Articles },
    data() {
        return {
            mouseX: 0, // 鼠标的 X 坐标
            mouseY: 0,  // 鼠标的 Y 坐标
            userProfile: {},
            followerList: [],
            followeeList: [],
            newList: [],
            newListPaper: [],
            paperList: [],
            favoriteList: [],
            paparNum: 0,
            favoriteNum: 0,
            followeeTag: false,
            xData: [], //横坐标
            yData_1: [], //数据
            yData_2: [], //数据
            Data: [],
            legend: [],
            motto: null,
            myChartStyle1: { float: "left", width: "100%", height: "340px" }, //图表样式
            myChartStyle2: { float: "left", width: "100%", height: "400px" }, //图表样式
            activeName: 'followee',
            activePaper: 'myPaper',
            showCard: [],
            showCardFav: [],
            dialogVisible: false,
            newMotto: ""
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initEcharts();
            this.getFollower();
            this.getFollowee();
            this.getFavoritePaperlist();
            this.paperList.forEach(() => {
                this.$set(this.showCard, this.showCard.length, false);
            });
            this.newListPaper.forEach(() => {
                this.$set(this.showCardFav, this.showCardFav.length, false);
            })
        });
        this.getUserProfile();
    },
    methods: {
        uploadAvatar() {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.addEventListener('change', (event) => {
                const file = event.target.files[0]
                if (!file) return
                const formData = new FormData()
                formData.append('file', file, file.name)
                // 发送 POST 请求上传头像
                this.$http.post('api/v1/users/profile/avatar', formData)
                    .then(res => {
                        this.userProfile.avatar = res.data.data.avatar;
                    })
                    .catch((error) => {
                        console.error(error)
                        // 上传失败
                    })
            })
            input.click();
        },
        async getUserProfile() {
            await this.$http.get('api/v1/users/profile/user', {
                params: {
                    mode: 'all',
                    uid: window.sessionStorage.getItem('uid')
                }
            })
                .then(res => {
                    // console.log(res);
                    this.userProfile = res.data.data;
                    this.motto = this.userProfile.attr.motto;
                }).catch(err => {
                    console.log(err);
                })
        },
        async changeProfile() {
            await this.$http.post('api/v1/users/profile/profile', {
                motto: this.motto
            })
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async getFollower() {
            await this.$http.get('api/v1/users/favorite/followers', {
                params: {
                    uid: window.sessionStorage.getItem('uid')
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
                    uid: window.sessionStorage.getItem('uid')
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
        async followUser(id, index) {
            this.newList[index].isFollowed = !this.newList[index].isFollowed;
            await this.$http.post('api/v1/users/favorite/follow', {
                uid: id
            })
                .then(res => {
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async gotoProfile(id) {
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: id,
                }
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
        async uploadFile() {
            let file = this.$refs.fileInput.files[0];
            let formData = new FormData();
            formData.append('file', file);
            try {
                let response = await axios.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                // console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async getPaperlist() {
            await this.$http.get('api/v1/papers/get/papers', {
                params: {
                    uid: window.sessionStorage.getItem('uid')
                }
            })
                .then(res => {
                    this.paperList = res.data.data.papers;
                    this.paperNum = res.data.data.total;
                }).catch(err => {
                    console.log(err);
                })
        },
        async getFavoritePaperlist() {
            await this.$http.get('api/v1/papers/get/favorite', {
                params: {
                    uid: window.sessionStorage.getItem('uid')
                }
            })
                .then(res => {
                    this.favoriteList = res.data.data.papers;
                    this.favoriteNum = res.data.data.total;
                    this.newListPaper = this.favoriteList.map(item => {
                        return {
                            ...item,
                            isFavorite: true
                        };
                    });
                }).catch(err => {
                    console.log(err);
                })
        },
        async removeFavorite(id, index) {
            this.newListPaper[index].isFavorite = !this.newListPaper[index].isFavorite;
            await this.$http.post('api/v1/papers/action/unfavorite', {
                pid: id
            })
                .then(res => {
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async favoritePaper(id, index) {
            this.newListPaper[index].isFavorite = !this.newListPaper[index].isFavorite;
            await this.$http.post('api/v1/papers/action/favorite', {
                pid: id
            })
                .then(res => {
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        },
        async getStatisticsBar() {
            await this.$http.get('api/v1/users/query/stat/bar', {
                params: {
                    uid: window.sessionStorage.getItem('uid')
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
                    uid: window.sessionStorage.getItem('uid')
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
                        center: ["50%", "41%"],
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
        editMotto() {
            this.newMotto = this.motto;
            this.dialogVisible = true;
        },
        saveMotto() {
            this.motto = this.newMotto;
            this.dialogVisible = false;
            this.changeProfile();
            this.$message({
                type: 'success',
                message: '修改成功!'
            });
        }
    }
};

</script>

  
<style lang="less" scoped>
@import "../../src/assets/css/article.css";

.border {
    max-width: max-content;
}

.follow-item:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
}

.fa-pen-to-square {
    transition: all 0.3s ease-in-out;
    /* 添加过渡效果 */
    transform: scale(1);
    /* 设置默认的缩放比例 */
    opacity: 0.8;
    /* 设置默认的透明度 */
}

.fa-pen-to-square:hover {
    cursor: pointer;
    cursor: pointer;
    position: relative;
    transform: scale(1.2);
    /* 鼠标移动到头像上时，放大 20% */
    opacity: 1;
    /* 鼠标移动到头像上时，使透明度设置为 1 */
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

.fa-star:hover {
    cursor: pointer;
}

.avatar-box:hover {
    cursor: pointer;
    position: relative;
    transform: scale(1.2);
    /* 鼠标移动到头像上时，放大 20% */
    opacity: 1;
    /* 鼠标移动到头像上时，使透明度设置为 1 */
}

.left-col {
    padding-left: 25px;
    padding-top: 25px;
}

.right-col {
    padding-left: 30px;
    padding-top: 25px;
    padding-right: 25px;
}

.user {
    display: flex;
    align-items: center;
    width: auto;
    padding-left: 20px;

    img {
        // margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .name {
        font-family: Montserrat-Black;
        font-size: 35px;
        margin-bottom: 10px;
        width: auto;
    }

    .access {
        color: gray;
    }
}

@media screen and (max-width: 1500px) {
    .user {
        flex-direction: column;
        justify-content: center;
        margin: auto;
    }
}

.paper-action .el-button {
    margin-left: 800px;
}


.page-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.follow-list {
    margin-left: unset;
    margin-right: unset;
    padding-left: 10px;
    height: 550px;
    width: auto;
    overflow-y: auto;
}

.follow-item {
    display: flex;
    display: inline-block;
    align-items: center;
    // padding: 20px;
    width: 100%;
    line-height: 1;

    .follow-info {
        display: flex;
        align-items: center;
        width: auto;

        .follow-tag {
            margin-left: auto;
        }
    }

    .card_name {
        font-family: Montserrat-Bold;
        margin-left: 20px;
        color: black;
        font-size: 20px;
        font-weight: 600;
        /* 设置初始状态字体为普通体 */
        transition: color 0.3s ease-in-out,
            transform 0.2s ease-in-out;
        /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
    }

    .card_name:hover {
        cursor: pointer;
        transform: scale(1.1);
        color: #0077ff !important;
    }
}

::v-deep .el-card__body {
    width: auto;
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
    height: 370px;
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
                    font-family: 'OpenSans-Bold', sans-serif;
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

                .paper_name {
                    font-family: 'OpenSans-Bold', sans-serif;
                    margin-left: 20px;
                    color: black;
                    font-size: 35px;
                    font-weight: 800;
                    /* 设置初始状态字体为普通体 */
                    transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
                    /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
                    line-height: 2;
                    white-space: nowrap;
                    /* 设置不换行 */
                    overflow: hidden;
                    /* 超出部分隐藏 */
                    text-overflow: ellipsis;
                    /* 超出部分显示省略号 */
                }

                .paper_name:hover {
                    cursor: pointer;
                    transform: scale(1.05);
                    color: #0077ff !important;
                }

                .shrink {
                    margin-left: auto;
                }
            }
        }

        .content {
            padding-left: 20px;
        }
    }
}

::v-deep .el-dialog__title {
    font-size: 25px;
    font-weight: 800;
}

::v-deep .el-input__inner {
    font-size: 20px;
}

::v-deep .el-input .el-input__count {
    font-size: 20px;
}

.follow-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
