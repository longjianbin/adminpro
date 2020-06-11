<template>
  <div class="loginForm">
    <div class="login-container">
      <h1 class="title">
        <i class="el-icon-s-platform"></i>
        野鸡管理系统
      </h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Api_Login } from "@/api/apis.js";
import { Api_Personal } from "@/api/apis.js";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      flag: true,
      ruleForm: {
        pass: "",
        name: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "账户名为3~10位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.flag == false) return;
          //发送请求
          this.flag = false;
          Api_Login(this.ruleForm.name, this.ruleForm.pass).then(res => {
            // console.log(res);
            if (res.data.code == 0) {
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });
              localStorage.setItem("name", this.ruleForm.name);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("role", res.data.role);
              localStorage.token=res.data.token
              
              this.Getpersonalinfo();

              //延时跳转
              setTimeout(() => {
                location.href = "#/index";
                // console.log(res);
                
              }, 1000);
            } else {
              this.$message.error({
                message: "很抱歉，登录失败，请检查用户名或密码是否正确"
              });
            }
          });

          //   计时器   防抖节流

          setTimeout(() => {
            this.flag = true;
          }, 3000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Getpersonalinfo() {
      this.id = localStorage.getItem("id");
      console.log(this.id);

      Api_Personal(this.id).then(res => {
        this.admininfo = res.data.accountInfo;
        localStorage.setItem("imgurl", this.admininfo.imgUrl);
      });
    }
  },

  created() {}
};
</script>

<style lang="less" scoped>
.loginForm {
  height: 100%;
  background: url("./../assets/imgs/bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    box-sizing: border-box;
    width: 500px;
    height: 375px;
    border-radius: 15px;
    background-color: rgba(40, 107, 112, 0.5);
    border: 1.5px solid #fff;
    padding: 30px 70px 0px 10px;
    color: #fff;
    .title {
      padding-left: 22%;
      margin-bottom: 40px;
      text-align: center;
    }
    .el-form-item__label {
      color: #fff;
    }
    button {
      width: 110px;
      margin-left: 20px;
    }
  }
}
</style>