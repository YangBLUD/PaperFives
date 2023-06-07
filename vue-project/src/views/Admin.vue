<template>
    <el-row class="border">
        <!-- 左栏 -->
        <el-col :span="8" class="left-col">
            <!-- 个人名片 -->
            <el-card class="box-card">
                <div class="user">
                    <div class="avatar-change">
                        <img :src="'http://81.70.161.76:5000' + this.userProfile.avatar" class="avatar" />
                        <span class="camera-icon" @click="uploadAvatar"><i class="fas fa-camera"></i></span>
                    </div>
                    <div>
                        <p class="name">{{ this.userProfile.username }}</p>
                    </div>
                </div>
            </el-card>
            <el-card style="height: 570px; margin-top: 40px;">
                <br><br>
                <div style="font-size: 45px; color: red; font-family: Montserrat-Black;">Papers to review</div>
                <br><br><br>
                <div style="font-size: 130px; color: red; font-family: Montserrat-Black;">{{ this.total }}</div>
                <br><br>
                <i class="fa-solid fa-pen-to-square fa-shake" style="font-size: 100px; color: red;"></i>
            </el-card>
        </el-col>
        <el-col :span="16" class="right-col">
            <el-row :gutter="20" class="paper-list">
                <template v-if="paperList.length > 0">
                    <el-col v-for="(item, index) in paperList" :key="index">
                        <el-card shadow="hover" class="paper-item">
                            <div class="wrapper">
                                <div class="paper-item-title">
                                    <span class="paper_name" @click="gotoPaperReview(item.pid)">{{ item.attr.title }}</span>
                                </div>
                                <div class="content">
                                    <div class="authors">
                                        <span v-for="(author, index) in item.authors">
                                            <span v-if="author.uid != 0" @click="gotoProfile(author.uid)" class="author-name">{{
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
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            userProfile: {},
            paperList: [],
            total: 0,
        };
    },
    mounted() {
        this.getUserProfile();
        this.getPapers();
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
                }).catch(err => {
                    console.log(err);
                })
        },
        async getPapers() {
            await this.$http.get('api/v1/papers/review/pending', {
                params: {
                    ps: 999999,
                    p: 1
                }
            })
                .then(res => {
                    console.log(res);
                    this.paperList = res.data.data.papers;
                    this.total = res.data.data.total;
                }).catch(err => {
                    console.log(err);
                })
        },
        gotoPaperReview(id) {
            this.$router.push({
                path: '/paperreview',
                query: {
                    pid: id,
                }
            })
        },
        gotoProfile(id) {
            this.$router.push({
                path: '/visitor',
                query: {
                    uid: id,
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import "../../src/assets/css/article.css";

.border {
    width: 100%;
    min-width: 1000px;
    max-width: 3000px;
    margin: 0 auto;
}

.avatar-change {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-change .avatar {
    transition: all 0.3s ease-in-out;
    transform: scale(1);
    opacity: 0.8;
}

.avatar-change:hover .avatar {
    transform: scale(1.2);
    opacity: 0.2;
}

.avatar-change .camera-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    opacity: 1;
    display: none;
}

.avatar-change:hover .camera-icon {
    cursor: pointer;
    display: block;
    opacity: 1;
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
        font-family: 'OpenSans-Bold', sans-serif;
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
    height: 800px;
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

                .paper_name {
                    font-family: 'ZillaSlab-Bold', sans-serif;
                    margin-left: 20px;
                    color: black;
                    font-size: 30px;
                    font-weight: 800;
                    /* 设置初始状态字体为普通体 */
                    transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;
                    /* 将多个属性的过渡效果放在同一个 'transition' 属性中 */
                    line-height: 1.5;
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
