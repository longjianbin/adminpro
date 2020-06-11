<template>
  <div id="adminadd_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账户</span>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        原密码：
        <el-input placeholder="请输入原密码" v-model="oldpwd" class="goods_inp" @change="Checkoldpwd"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        新密码：
        <el-input placeholder="请输入新密码" v-model="newpwd" class="goods_inp"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        确认新密码：
        <el-input placeholder="确认新密码" v-model="repwd" class="goods_inp" @change="Repwd"></el-input>
      </div>
      <p style="margin-top:10px; padding-left:30px">
        <el-button type="primary" @click="editpwd">确定</el-button>
        <el-button>重置</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { Api_Checkoldpwd } from "@/api/apis.js";
import { Api_Editpwd } from "@/api/apis.js";
export default {
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      repwd: "",
      id: "",
      oldflag: false,
      repwdflag: false
    };
  },
  methods: {
    Checkoldpwd() {
      console.log(this.id, this.oldpwd);
      Api_Checkoldpwd(this.oldpwd, this.id).then(res => {
        // console.log(res);
        if (res.data.code == 11) {
          this.$message.error({
            message: "原密码错误，请重新输入"
          });
        } else {
          this.oldflag = true;
        }
      });
    },
    Repwd() {
      if (!(this.repwd == this.newpwd)) {
        this.$message.error({
          message: "两次密码不一致，请重新输入"
        });
      } else {
        this.repwdflag = true;
      }
    },
    editpwd() {
      if (this.oldflag && this.repwdflag) {
        Api_Editpwd(this.id, this.newpwd).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，修改成功",
              type: "success"
            });
            this.oldpwd = "";
            this.newpwd = "";
            this.repwd = "";
            this.oldflag = false;
            this.repwdflag = false;
          }
        });
      }
    },
    Getid() {
      this.id = localStorage.getItem("id");
    }
  },
  created() {
    this.Getid();
  }
};
</script>

<style lang="less" scoped>
#adminadd_box {
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