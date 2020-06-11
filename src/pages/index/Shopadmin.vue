<template>
  <div id="shopadmin_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button style="float: right; padding: 3px 0 0 0" type="primary">保存</el-button>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        店铺名称
        <el-input v-model="shopname" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        店铺公告
        <el-input type="textarea" v-model="dpgg" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        店铺头像
        <el-image style="width: 100px; height: 100px" :src="url1" :fit="fit1"></el-image>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        店铺图片
        <div class="demo-image clearfix">
          <div class="block" style="float: left" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        配送费
        <el-input v-model="psf" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        配送时间
        <el-input v-model="pssj" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        配送描述
        <el-input v-model="psms" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        店铺评分
        <el-input v-model="dppf" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        销量
        <el-input v-model="xl" class="w300"></el-input>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        活动
        <el-checkbox-group v-model="type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="demo-input-suffix ml25-mb10">
        营业时间
        <el-time-picker
          is-range
          v-model="value"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopname: "粥品香坊（天府新谷）",
      dpgg: "随便说点。。。。。",
      //头像
      fit1: "",
      url1:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //店铺图片
      fits: ["", ""],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      psf: "8",
      pssj: "38",
      psms: "蜂鸟专送",
      dppf: "4.5",
      xl: "100",
      type: [],
      value1: "",
      //图片上传数据
      imageUr: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
#shopadmin_box {
  width: 100%;
    height: 88%;

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
.ml25-mb10 {
  margin-left: 25px;
  margin-bottom: 10px;
}
.w300 {
  width: 300px;
}
.box-card {
  margin: 0 auto;
  width: 96%;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  overflow-y: auto;
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
i {
  border: 1px solid #000;
}
</style>