<template>
    <div class="login_con">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../../assets/logo.png" alt="">
            </div>
            <!-- 登陆表单区域 -->
            <el-form :model="loginForm" :rules="loginRules" label-width="80px" class="login_form" ref="loginRef">
                <!-- 用户名 -->
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" prefix-icon="iconfont icon-user" clearable></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" clearable></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登 录</el-button>
                    <el-button type="warning" @click="register">注 册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
require("../../assets/js/background.js")
export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            var regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (regemail.test(value)) {
                return callback()
            }
            callback(new Error('请输入合法邮箱'))
        }
        return {
            // 登陆表单的数据对象
            loginForm: {
                email: '',
                password: ''
            },
            // 表单验证规则
            loginRules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 登录
        login() {
            this.$refs.loginRef.validate(async (valid)=>{
                if(!valid) return ;
                const {data:res} = await this.$http.post('/api/v1/users/login',this.loginForm);
                if(res.meta.status!=0) 
                    return this.$message.error(res.meta.msg)
                
                this.$message.success(res.meta.msg)

                window.sessionStorage.setItem('token',res.token);
                window.sessionStorage.setItem('uid',res.data.uid);
                // 页面跳转
                this.$router.push("/home");
            });
        },
        // 注册
        register() {
            this.$router.push({path:"/register"});
        }
    }
}
</script>

<style lang="less" scoped>
// .login_con {
//     background-color: #98c1ea;
//     opacity: 0.5;
//     z-index: -1;
//     height: 100%;
// }

.login_box {
    width: 450px;
    height: 300px;
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

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>