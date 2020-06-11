<template>
  <div id="adminadd_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账户</span>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        账户：
        <el-input placeholder="请输入用户名" v-model="acc" class="goods_inp" @change="checkaccount"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        密码：
        <el-input placeholder="请输入密码" v-model="pwd" class="goods_inp"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        用户组：
        <el-select v-model="type" slot="prepend" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </div>
      <p style="margin-top:10px; padding-left:30px">
        <el-button type="primary" @click="clickAdminadd">添加</el-button>
        <el-button @click="reAdminadd">重置</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { Api_Adminadd } from "@/api/apis.js";
import { Api_Checkaccount } from "@/api/apis.js";

export default {
  data() {
    return {
      acc: "",
      pwd: "",
      type: "",
      flag: true
    };
  },
  methods: {
    checkaccount() {
      Api_Checkaccount(this.acc).then(res => {
        if(res.data.code === 1){
          this.$message.error({
            message: "用户名已存在"
          });
          this.flag =false;
        }else{
          this.flag=true;
        }
      })
      // console.log(11111);
      
    },
    clickAdminadd() {
      if (this.flag == false) return;
      this.flag = false;
      Api_Adminadd(this.acc, this.pwd, this.type).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，登录添加",
            type: "success"
          });
          this.acc = "";
          this.pwd = "";
          this.type = "";
        } else {
          this.$message.error({
            message: "很抱歉，添加失败"
          });
        }
      });
      //   计时器   防抖节流
      setTimeout(() => {
        this.flag = true;
      }, 3000);
    },
    reAdminadd() {
      this.acc = "";
      this.pwd = "";
      this.type = "";
    }
  }
};
</script>

<style lang="less" scoped>
#adminadd_box {
  // box-sizing: border-box;
  height: 88%;
  width: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  //   width: 480px;
  margin: 0 auto;
  width: 96%;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
}
.goods_inp {
  // margin-left: 25px;
  margin-bottom: 10px;
  width: 300px;
}
</style>