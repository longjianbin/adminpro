<template>
  <div id="per_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div class="text item">
        <p>管理员ID:&emsp;{{this.admininfo.id}}</p>
      </div>
      <div class="text item">
        <p>账号:&emsp;{{this.admininfo.account}}</p>
      </div>
      <div class="text item">
        <p>用户组:&emsp;{{this.admininfo.userGroup}}</p>
      </div>
      <div class="text item">
        <p>创建时间:&emsp;{{this.admininfo.ctime | dataFormat}}</p>
      </div>
      <div class="text item">
        <p>
          管理员头像:&emsp;
          <img :src="this.admininfo.imgUrl" />
        </p>
      </div>
      <div>
        <h3 class="text">头像上传修改:</h3>

        <!-- 头像上传 -->
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
        >
          <img v-if="imgUrl" :src="baseImgUrl + imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- 修改头像 -->
        <el-button @click="changeAvatar" type="primary" size="mini">修改头像</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Api_Personal } from "@/api/apis.js";
import { Api_EditAvatar } from "@/api/apis.js";
import inu from "./../../assets/imgs/inu.jpg";
export default {
  data() {
    return {
      //图片上传
      imgUrl: "",
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
      id: "",
      admininfo: {
        id: 123,
        acc: "admin",
        type: "超级管理员",
        time: "2019/10/20",
        src: inu
      }
    };
  },
  methods: {
    //图片上传
    handleAvatarSuccess(res) {
      console.log("上传成功后端返回来的数据", res);
      let { code, imgUrl } = res;
      if (code == 0) {
        this.imgUrl = imgUrl;
      }
    },

    // 点击修改头像
    async changeAvatar() {
      // console.log(1111);

      // 发送ajax
      await Api_EditAvatar(this.imgUrl, this.id).then(res => {
        if (res.data.code === 0) {
          this.Getpersonalinfo();
        }
      });
      document.getElementById("upAvatar").src =  this.admininfo.imgUrl;
          this.$router.go(0)

    },

    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  created() {
    this.Getpersonalinfo();
  }
};
</script>

<style lang="less" scoped>
#per_box {
  width: 100%;
  height: 100%;

  .box-card {
    margin: 0 auto;
    width: 96%;
    height: 100%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 10px;
    // border: 1px solid #000;
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 10px;
      p {
        height: 50px;
        line-height: 50px;
        img {
          width: 50px;
          line-height: 50px;
        }
      }
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>