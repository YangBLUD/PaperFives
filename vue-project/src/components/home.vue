<template>
    <el-container class="home-container">
        <!-- 主页头部 -->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>论文检索系统</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>

        <el-container>
            <!-- 主页侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '160px'">
                <div class="toggle-button" @click="toggleCollapse">|||

                </div>
                <el-menu background-color='#333744' text-color="#fff" active-text-color="#409EFF" unique-opened
                    :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active=activePath>
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                            @click=saveState(activePath)>
                            <template slot="title">
                                <i :class="subItem.icon"></i>
                                <span>{{ subItem.authName }}</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>

            <!-- 主页主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                </el-breadcrumb>
                <el-card class="search">
                    <!-- 搜索与添加区域 -->
                    <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select"
                        @keyup.enter.native="goSearch" style="width: 750px; font-size: 17px">
                        <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width: 130px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" slot="append" icon="el-icon-search" @click="goSearch"></el-button>
                    </el-input>
                </el-card>
                <div class="topRecommend" id="topRecommend">
                    <el-tabs v-model="activeNameOut">
                        <el-tab-pane label="热门文献" name="topArticle" style="text-align: left">
                            <Articles :articles="top_articles"></Articles>
                        </el-tab-pane>
                        <el-tab-pane label="热门学者" name="topAuthor" style="text-align: left">
                            <Authors :authors="top_authors"></Authors>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import path from 'path'

export default {
  data () {
    return {
      menuList: [
        {
          id: 1,
          authName: '热门',
          icon: 'el-icon-s-open',
          path: '',
          children: [
            {
              id: 1,
              authName: '热门领域',
              icon: 'el-icon-s-open',
              path: ''
            },
            {
              id: 1,
              authName: '热门学者',
              icon: 'el-icon-s-custom',
              path: ''
            }
          ]
        },
        {
          id: 11,
          authName: '我的',
          icon: 'el-icon-user-solid',
          path: '',
          children: [
            {
              id: 1,
              authName: '主页',
              icon: 'el-icon-house',
              path: 'user'
            },
            {
              id: 1,
              authName: '信息',
              icon: 'el-icon-document',
              path: 'userinfo'
            },
            {
              id: 1,
              authName: '消息',
              icon: 'el-icon-chat-dot-square',
              path: ''
            }
          ]
        },
        {
          id: 1,
          authName: '设置',
          icon: 'el-icon-setting',
          path: ''
        }
      ],
      isCollapse: false, // 是否折叠
      activePath: '',
      searchValue: '',
      options: [
        {
          value: 'main',
          label: '篇关摘'
        }, {
          value: 'title',
          label: '篇名'
        }, {
          value: 'abstract',
          label: '摘要'
        }, {
          value: 'field',
          label: '领域'
        }, {
          value: 'author_name',
          label: '作者'
        }, {
          value: 'affiliation_name',
          label: '作者单位'
        }, {
          value: 'publisher',
          label: '文献来源'
        }, {
          value: 'doi',
          label: 'DOI'
        }
      ],
      select: '',
      top_articles: [
        {
          authors: [
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            },
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            },
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            }
          ],
          book_title: '',
          citation_count: '0',
          citation_msg: [],
          conference: {
            name: ''
          },
          collect_num: 13,
          conference_id: '',
          date: '2021-11-01',
          doctype: '',
          doi: '10.1016/J.SIMPA.2021.100115',
          doi_url: 'https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI',
          fields: [],
          first_page: '100115',
          journal: {
            citation_count: '451567',
            issn: '',
            journalid: '2597175965',
            name: 'arXiv: Computer Vision and Pattern Recognition',
            paper_count: '49431',
            publisher: '',
            rank: '8182',
            webpage: ''
          },
          journal_id: '',
          last_page: '12312',
          paper_id: '3191610454',
          paper_title: 'mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model',
          publisher: 'Elsevier BV',
          rank: '23112',
          reference_count: '12',
          volume: '10',
          year: '2021',
          abstract: 'Importance In December 2019, novel coronavirus (2019-nCoV)–infected pneumonia (NCIP) occurred in Wuhan, China. The number of cases has increased rapidly but information on the clinical characteristics of affected patients is limited. Objective To describe the epidemiological and clinical characteristics of NCIP. Design, Setting, and Participants Retrospective, single-center case series of the 138 consecutive hospitalized patients with confirmed NCIP at Zhongnan Hospital of Wuhan University in Wuhan, China, from January 1 to January 28, 2020; final date of follow-up was February 3, 2020. Exposures Documented NCIP. Main Outcomes and Measures Epidemiological, demographic, clinical, laboratory, radiological, and treatment data were collected and analyzed. Outcomes of critically ill patients and noncritically ill patients were compared. Presumed hospital-related transmission was suspected if a cluster of health professionals or hospitalized patients in the same wards became infected and a possible source of infection could be tracked. Results Of 138 hospitalized patients with NCIP, the median age was 56 years (interquartile range, 42-68; range, 22-92 years) and 75 (54.3%) were men. Hospital-associated transmission was suspected as the presumed mechanism of infection for affected health professionals (40 [29%]) and hospitalized patients (17 [12.3%]). Common symptoms included fever (136 [98.6%]), fatigue (96 [69.6%]), and dry cough (82 [59.4%]). Lymphopenia (lymphocyte count, 0.8 × 109/L [interquartile range {IQR}, 0.6-1.1]) occurred in 97 patients (70.3%), prolonged prothrombin time (13.0 seconds [IQR, 12.3-13.7]) in 80 patients (58%), and elevated lactate dehydrogenase (261 U/L [IQR, 182-403]) in 55 patients (39.9%). Chest computed tomographic scans showed bilateral patchy shadows or ground glass opacity in the lungs of all patients. Most patients received antiviral therapy (oseltamivir, 124 [89.9%]), and many received antibacterial therapy (moxifloxacin, 89 [64.4%]; ceftriaxone, 34 [24.6%]; azithromycin, 25 [18.1%]) and glucocorticoid therapy (62 [44.9%]). Thirty-six patients (26.1%) were transferred to the intensive care unit (ICU) because of complications, including acute respiratory distress syndrome (22 [61.1%]), arrhythmia (16 [44.4%]), and shock (11 [30.6%]). The median time from first symptom to dyspnea was 5.0 days, to hospital admission was 7.0 days, and to ARDS was 8.0 days. Patients treated in the ICU (n = 36), compared with patients not treated in the ICU (n = 102), were older (median age, 66 years vs 51 years), were more likely to have underlying comorbidities (26 [72.2%] vs 38 [37.3%]), and were more likely to have dyspnea (23 [63.9%] vs 20 [19.6%]), and anorexia (24 [66.7%] vs 31 [30.4%]). Of the 36 cases in the ICU, 4 (11.1%) received high-flow oxygen therapy, 15 (41.7%) received noninvasive ventilation, and 17 (47.2%) received invasive ventilation (4 were switched to extracorporeal membrane oxygenation). As of February 3, 47 patients (34.1%) were discharged and 6 died (overall mortality, 4.3%), but the remaining patients are still hospitalized. Among those discharged alive (n = 47), the median hospital stay was 10 days (IQR, 7.0-14.0). Conclusions and Relevance In this single-center case series of 138 hospitalized patients with confirmed NCIP in Wuhan, China, presumed hospital-related transmission of 2019-nCoV was suspected in 41% of patients, 26% of patients received ICU care, and mortality was 4.3%.'
        },
        {
          collect_num: 13,
          authors: [
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            },
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            },
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            }
          ],
          book_title: '',
          citation_count: '0',
          citation_msg: [],
          conference: {
            name: ''
          },
          conference_id: '',
          date: '2021-11-01',
          doctype: '',
          doi: '10.1016/J.SIMPA.2021.100115',
          doi_url: 'https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI',
          fields: [],
          first_page: '100115',
          journal: {
            citation_count: '451567',
            issn: '',
            journalid: '2597175965',
            name: 'arXiv: Computer Vision and Pattern Recognition',
            paper_count: '49431',
            publisher: '',
            rank: '8182',
            webpage: ''
          },
          journal_id: '',
          last_page: '12312',
          paper_id: '3191610454',
          paper_title: 'mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model',
          publisher: 'Elsevier BV',
          rank: '23112',
          reference_count: '12',
          volume: '10',
          year: '2021'
        },
        {
          collect_num: 13,
          authors: [
            {
              affiliation_id: '',
              affiliation_name: 'Independent Researcher',
              author_id: '3323123',
              author_name: 'Sergei Belousov',
              order: '1'
            }
          ],
          book_title: '',
          citation_count: '0',
          citation_msg: [],
          conference: {
            name: ''
          },
          conference_id: '',
          date: '2021-11-01',
          doctype: '',
          doi: '10.1016/J.SIMPA.2021.100115',
          doi_url: 'https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI',
          fields: [],
          first_page: '100115',
          journal: {
            citation_count: '451567',
            issn: '',
            journalid: '2597175965',
            name: 'arXiv: Computer Vision and Pattern Recognition',
            paper_count: '49431',
            publisher: '',
            rank: '8182',
            webpage: ''
          },
          journal_id: '',
          last_page: '12312',
          paper_id: '3191610454',
          paper_title: 'mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model',
          publisher: 'Elsevier BV',
          rank: '23112',
          reference_count: '12',
          volume: '10',
          year: '2021'
        }
      ]
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 切换侧边折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接激活
    saveState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    },
    gosearch () {

    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 16px;
        }
    }
}

.el-aside {
    background-color: #333744;
}

.el-main {
    background-color: #EAEDF1;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.topRecommend {
    min-width: 900px;
    margin: 50px 12%;
    padding: 20px 40px 60px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.search {
    margin: 50px 12%;
    background-color: white;
    min-width: 900px;
}
</style>
