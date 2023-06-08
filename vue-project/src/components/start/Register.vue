<template>
    <div class="regist_con">
        <div class="regist_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../../assets/logo.png" alt="">
            </div>
            <!-- 登陆表单区域 -->
            <el-form :model="regForm" :rules="regFormRules" ref="regFormRef" class="reg_form" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="regForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="regForm.password"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="regForm.email"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="checkCode">发送验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="VC">
                    <el-input v-model="regForm.code"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="regUser">注 册</el-button>
                    <el-button type="warning" @click="cancle">取 消</el-button>
                    <el-button type="info" @click="resetRegForm">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
require("../../assets/js/background.js")
export default {
    data() {
        // 验证邮箱手机的规则 （自定义校验规则
        var checkEmail = (rule, value, callback) => {
            var regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (regemail.test(value)) {
                return callback()
            }
            callback(new Error('请输入合法邮箱'))
        }
        return {
            //添加用户的表单
            regForm: {
                username: '',
                password: '',
                email: '',
                code: ''
            },
            regFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名长度在3-10个字符之间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '密码长度在6-15个字符之间', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        document.title = "Register"
    },
    methods: {
        // 重置
        resetRegForm() {
            this.$refs.regFormRef.resetFields();
        },
        // 注册
        regUser() {
            this.$refs.regFormRef.validate(async (valid) => {
                if (!valid) return;
                const { data: res } = await this.$http.post('/api/v1/users/register', this.regForm);
                if (res.meta.status != 0)
                    return this.$message.error(res.meta.msg)
                this.$message.success(res.meta.msg)
                // // 页面跳转
                this.$router.push("/login");
            });
        },
        cancle() {
            // this.$router.push('/main')
            this.$router.back();
        },
        //发送验证码
        async checkCode() {
            const { data: res } = await this.$http.post('/api/v1/users/verification', { email: this.regForm.email });
            if (res.meta.status != 0) {
                return this.$message.error(res.meta.msg)
            }
            this.$message.success(res.meta.msg)
        },

    }
}
</script>

<style lang="less" scoped>
.regist_box {
    width: 450px;
    height: 480px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.reg_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>

