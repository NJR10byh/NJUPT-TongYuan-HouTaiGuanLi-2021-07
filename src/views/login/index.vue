/* eslint-disable space-infix-ops */
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h1 class="title">南京邮电大学 通信与信息工程学院</h1>
        <h3 class="title">2021级新生文明素养测试 后台管理系统</h3>
      </div>

      <el-form-item prop="teacherName">
        <span class="svg-container"><svg-icon icon-class="user" /></span>
        <el-input ref="teacherName" v-model="loginForm.teacherName" placeholder="用户名" name="teacherName" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="teacherId">
        <span class="svg-container"><svg-icon icon-class="password" /></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.teacherId"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px;font-size:20px;font-weight:bold;letter-spacing:1px;" @click="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请填写用户名！'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请填写密码！'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        teacherName: '',
        teacherId: ''
      },
      loginRules: {
        teacherName: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        teacherId: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      if (this.loginForm.teacherName != '' && this.loginForm.teacherId != '') {
        const that = this;
        that
          .request('teacher/Login', that.loginForm, 'POST', {})
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$router.push({
                path: '/Home'
              });
            } else if (res.data.code == 1) {
              this.$message({
                message: '教师名或者工号错误',
                type: 'error'
              });
            }
          })
          .catch(res => {
            this.$message({
              message: res.data.errMessage,
              type: 'error'
            });
          });
      } else {
        this.$message({
          message: '请填写用户名或密码',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 50px;
    width: 85%;
    font-size: 16px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 50px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  // border: 1px solid red;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    // border: 1px solid red;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
