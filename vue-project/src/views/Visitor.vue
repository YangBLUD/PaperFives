<template>
    <el-row class="border">
        <!-- 个人名片 -->
        <div style="display: flex; justify-content: center; align-items: center; padding-top: 30px;">
            <el-card class="box-card" style="margin: 0 auto;">
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
                <el-col v-show="isFollowed !== null" :span="2" style="display: flex; justify-content: center; align-items: center;">
                    <div>
                        <i v-if="this.isFollowed" class="el-icon-star-on" style="font-size:70px; color: #FFBE00;"
                            @click="removeFollower()"></i>
                        <i v-else class="el-icon-star-off" style="font-size:70px; color: #FFBE00;"
                            @click="followUser()"></i>
                    </div>
                </el-col>
            </el-card>
        </div>

        <!-- 论文列表 -->
        <el-row :gutter="20" class="paper-list">
            <template v-if="paperList.length > 0">
                <el-col :span="12" v-for="(item, index) in paperList" :key="index">
                    <el-card shadow="hover" class="papaer-item">
                        <!-- 查看操作 -->
                        <div class="paper-action">
                            <el-button type="primary" size="small" @click="">查看论文</el-button>
                        </div>
                    </el-card>
                </el-col>
            </template>
            <template v-else>
                <el-col :span="12">
                    <el-empty description="无论文数据" :image-size="250"></el-empty>
                </el-col>
            </template>
            <template v-if="paperList.length > 0">
                <el-col :span="12" v-for="(item, index) in paperList" :key="index">
                    <el-card shadow="hover" class="papaer-item">
                        <!-- 查看操作 -->
                        <div class="paper-action">
                            <el-button type="primary" size="small" @click="">查看论文</el-button>
                        </div>
                    </el-card>
                </el-col>
            </template>
            <template v-else>
                <el-col :span="12">
                    <el-empty description="无论文数据" :image-size="250"></el-empty>
                </el-col>
            </template>
        </el-row>

        <!-- 图表部分 -->
        <div class="graph">
            <el-card style="height: 330px">
                <div class="echart" id="mychart1" :style="myChartStyle"></div>
            </el-card>
            <el-card style="height: 330px">
                <div class="echart" id="mychart2" :style="myChartStyle"></div>
            </el-card>
        </div>
    </el-row>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      isFollowed: null,
      userProfile: {},
      userAttr: {},
      paperList: [],
      xData: ['1990s', '2000s', '2010s', '2020s'], // 横坐标
      yData: [23, 24, 18, 25], // 数据
      myChartStyle: { float: 'left', width: '90%', height: '280px' }, // 图表样式
      activeName: 'first'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initEcharts()
      this.getUserProfile()
      this.isFollowee()
    })
  },
  methods: {
    async getUserProfile () {
      await this.$http.get('api/v1/users/profile/user', {
        params: {
          mode: 'all',
          uid: this.$route.query.uid
        }
      })
        .then(res => {
          console.log(res)
          this.userProfile = res.data.data
          this.userAttr = res.data.data.attr
        }).catch(err => {
          console.log(err)
        })
    },
    async followUser () {
      this.isFollowed = !this.isFollowed
      await this.$http.post('api/v1/users/favorite/follow', {
        uid: this.$route.query.uid
      })
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    async removeFollower () {
      this.isFollowed = !this.isFollowed
      await this.$http.post('api/v1/users/favorite/unfollow', {
        uid: this.$route.query.uid
      })
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    async isFollowee () {
      await this.$http.get('api/v1/users/favorite/isfollowee', {
        params: {
          uid: this.$route.query.uid
        }
      })
        .then(res => {
          console.log(res)
          this.isFollowed = res.data.data.value
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
    }
  }
}

</script>

<style lang="less" scoped>
.border {
    max-width: 1500px;
}

.box-card {
    display: flex;
    justify-content: center;
    width: 1200px;
}

.box-card::v-deep .el-card__body {
    width: 1050px;
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
        font-family: Montserrat;
        font-size: 35px;
        margin-bottom: 10px;
        width: 500px;
    }

    .access {
        color: gray;
    }

    .institute {
        font-size: 16px;
        margin-bottom: 10px;
        width: 500px;
        color: #0077c2;
    }

    .motto {
        font-size: 16px;
        font-style: italic;
        margin-bottom: 10px;
        width: 500px;
    }
}

.paper-action .el-button {
    margin-left: 800px;
}

.el-button {
    margin-left: 250px;
}

.page-title {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 20px;
}

.graph {
    padding-top: 50px;
    padding-left: 150px;
    padding-right: 150px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}

.paper-list {
    padding-top: 50px;
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
</style>
