<template>
    <!-- 页面框架 -->
    <el-row class="border">
        <el-col :span="8" class="left-col">
            <!-- 个人名片 -->
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
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </el-col>

        <!-- 论文列表 -->
        <el-col :span="16" class="right-col">
            <!-- 论文列表 -->
            <el-row :gutter="20" class="paper-list">
                <template v-if="paperList.length > 0">
                    <el-col v-for="(item, index) in paperList" :key="index">
                        <el-card shadow="hover" class="paper-item">
                            <div class="wrapper">
                                <div v-show="showCard[index]">
                                    <el-button icon="el-icon-arrow-left" @click="$set(showCard, index, false)" size="mini"></el-button>
                                    <p class="paper_name">{{ item.attr.title }}</p>
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
                                            <span v-for="(keyword) in item.attr.keywords">
                                                ●{{ keyword }}&nbsp;&nbsp;&nbsp;
                                            </span>
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
                                    <div style="font-size: 25px; font-family: 'EB Garamond', serif; font-weight: 600;">
                                        {{ item.attr.title }}
                                        <el-button icon="el-icon-view" size="mini" circle
                                            @click="$set(showCard, index, true)"></el-button>
                                        <el-button v-if="item.status === 0" type="success" size="normal"
                                            icon="el-icon-edit">
                                            草稿
                                        </el-button>
                                        <el-button v-else-if="item.status === 1" type="success" size="normal"
                                            icon="el-icon-edit">
                                            草稿
                                        </el-button>
                                        <el-button v-else-if="item.status === 2" type="warning" size="normal"
                                            icon="el-icon-s-check">
                                            审核中
                                        </el-button>
                                        <el-button v-else-if="item.status === 3" type="warning" size="normal"
                                            icon="el-icon-s-check">
                                            草稿
                                        </el-button>
                                        <el-button v-else-if="item.status === 4" type="danger" size="normal"
                                            icon="el-icon-error">
                                            已驳回
                                        </el-button>
                                        <el-button v-else-if="item.status === 5" type="primary" size="normal"
                                            icon="el-icon-success">
                                            已发表
                                        </el-button>
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

            <!-- 我的统计 -->
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
import Articles from '../components/hot/Articles.vue'
export default {
  components: { Articles },
  data () {
    return {
      mouseX: 0, // 鼠标的 X 坐标
      mouseY: 0, // 鼠标的 Y 坐标
      userProfile: {},
      followerList: [],
      followeeList: [],
      newList: [],
      paperList: [],
      paparNum: 0,
      followeeTag: false,
      xData: ['1990s', '2000s', '2010s', '2020s'], // 横坐标
      yData: [23, 24, 18, 25], // 数据
      myChartStyle: { float: 'left', width: '90%', height: '280px' }, // 图表样式
      activeName: 'first',
      showCard: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initEcharts()
      this.getFollower()
      this.getFollowee()
      this.getPaperlist()
      this.paperList.forEach(() => {
        this.$set(this.showCard, this.showCard.length, false)
      })
    })
    this.getUserProfile()
  },
  methods: {
    async getUserProfile () {
      await this.$http.get('api/v1/users/profile/user', {
        params: {
          mode: 'all',
          uid: window.sessionStorage.getItem('uid')
        }
      })
        .then(res => {
          console.log(res)
          this.userProfile = res.data.data
        }).catch(err => {
          console.log(err)
        })
    },
    async getFollower () {
      await this.$http.get('api/v1/users/favorite/followers', {
        params: {
          uid: window.sessionStorage.getItem('uid')
        }
      })
        .then(res => {
          this.followerList = res.data.data.list
        }).catch(err => {
          console.log(err)
        })
    },
    async getFollowee () {
      await this.$http.get('api/v1/users/favorite/followees', {
        params: {
          uid: window.sessionStorage.getItem('uid')
        }
      })
        .then(res => {
          this.followeeList = res.data.data.list
          this.newList = this.followeeList.map(item => {
            return {
              ...item,
              isFollowed: true
            }
          })
        }).catch(err => {
          console.log(err)
        })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async removeFollower (id, index) {
      // this.followeeList.splice(index, 1)
      this.newList[index].isFollowed = !this.newList[index].isFollowed
      await this.$http.post('api/v1/users/favorite/unfollow', {
        uid: id
      })
        .then(res => {
          // console.log(res);
        }).catch(err => {
          console.log(err)
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
    async followUser (id, index) {
      this.newList[index].isFollowed = !this.newList[index].isFollowed
      await this.$http.post('api/v1/users/favorite/follow', {
        uid: id
      })
        .then(res => {
          // console.log(res);
        }).catch(err => {
          console.log(err)
        })
    },
    async gotoProfile (id) {
      console.log(this.followeeTag)
      this.$router.push({
        path: '/visitor',
        query: {
          uid: id
        }
      })
    },
    async uploadFile () {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        // console.log(response.data);
      } catch (error) {
        console.error(error)
      }
    },
    async getPaperlist () {
      await this.$http.get('api/v1/papers/get/papers', {
        params: {
          uid: window.sessionStorage.getItem('uid')
        }
      })
        .then(res => {
          this.paperList = res.data.data.papers
          this.paperNum = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
    },
    initEcharts () {
      // 基本柱状图
      const option1 = {
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: '论文发表记录',
          top: '0%',
          left: 'center',
          textStyle: {
            color: '#333',
            fontWeight: 'bold',
            fontFamily: 'Microsoft YaHei'
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
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            margin: 10
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            margin: 10
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        color: ['#2ec7c9'],
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.yData,
            barWidth: 30,
            itemStyle: {
              color: '#2ec7c9'
            }
          }
        ]
      }

      const option2 = {
        legend: {
          // 图例
          data: ['OS', 'OO', 'DB', 'SE', 'AI'],
          right: '10%',
          top: '50%',
          orient: 'vertical',
          textStyle: {
            color: '#666',
            fontSize: 14
          },
          itemWidth: 16,
          itemHeight: 16,
          itemGap: 20
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: '研究领域分布',
          top: '0%',
          left: 'center',
          textStyle: {
            color: '#333',
            fontWeight: 'bold',
            fontFamily: 'Microsoft YaHei'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '55%'],
            label: {
              show: true,
              fontSize: 16,
              formatter: '{b} {d}%'
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
                name: 'OS'
              },
              {
                value: 395,
                name: 'OO'
              },
              {
                value: 157,
                name: 'DB'
              },
              {
                value: 149,
                name: 'SE'
              },
              {
                value: 147,
                name: 'AI'
              }
            ],
            itemStyle: {
              borderWidth: 10,
              borderColor: '#fff'
            }
          }
        ]
      }
      const myChart1 = echarts.init(document.getElementById('mychart1'))
      myChart1.setOption(option1)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart1.resize()
      })

      const myChart2 = echarts.init(document.getElementById('mychart2'))
      myChart2.setOption(option2)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart2.resize()
      })
    },
    handleMouseMove (event) {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
    }
  }
}

</script>

<style lang="less" scoped>
@import "../../src/assets/css/article.css";

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
        margin-right: 40px;
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

.paper-action .el-button {
    margin-left: 800px;
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
    overflow-y: auto;
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
    height: 420px;
    overflow-y: auto;
    text-align: left !important;

    .paper-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        // .wrapper{
        //     height: 75px;
        // }

        .content {
            padding-left: 20px;
        }

        .paper_name {
            font-family: 'EB Garamond', serif;
            margin-left: 20px;
            color: black;
            font-size: 35px;
            font-weight: 800;
            /* 设置初始状态字体为普通体 */
            transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
            /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
        }

        .paper_name:hover {
            cursor: pointer;
            transform: scale(1.1);
            color: #0077ff !important;
        }
    }
}

.follow-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
