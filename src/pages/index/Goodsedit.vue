<template>
  <div id="goodsadd_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品编辑</span>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        商品名称：
        <el-input placeholder="商品名称" v-model="goods_name_input" class="goods_inp"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        商品分类：
        <el-select v-model="categories_select" slot="prepend" placeholder="请选择商品分类">
          <el-option
            v-for="item in this.categories"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>

          <!-- <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>-->
        </el-select>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        商品价格：
        <el-input-number
          v-model="price_num"
          @change="handleChange"
          :min="1"
          :max="100"
          label="商品价格"
        ></el-input-number>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        商品图片：
        <img :src='imgUrl' class="avatar ml50-bt10" />
        </div>
 <div class="demo-input-suffix ml25-bt10">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="newimgUrl" :src="baseImgUrl + newimgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        商品描述：
        <el-input
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
          v-model="desc_textarea"
          class="goods_text"
        ></el-input>
      </div>
      <p class="btn_p">
        <el-button type="primary" @click="addclick">确认添加</el-button>
        <el-button type="primary" @click="clickback">返回</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { Api_Categories } from "@/api/apis.js";
import { Api_Editgoods } from "@/api/apis.js";

export default {
  data() {
    return {
      goods_name_input: "",
      imgUrl: "",
      newimgUrl: "",
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      price_num: 1,
      id: 1,
      desc_textarea: "",
      categories_select: "",
      categories: []
    };
  },
  methods: {
    //获取所有状态启用的分类名称
    Getcategories() {
      Api_Categories().then(res => {
        // if (res.data.code == 0) {
        this.categories = res.data.categories;
        // console.log(this.categories);
        // }
      });
    },
    handleChange(value) {
      // console.log(value);
      this.price_num = value;
    },
    handleAvatarSuccess(res) {
      let { code, imgUrl } = res;
      if (code == 0) {
        this.newimgUrl = imgUrl;
      }
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
    },
    clickback() {
      this.$router.push("/index/goodslist");
    },
    //确认修改商品
    addclick() {
      Api_Editgoods(
        this.goods_name_input,
        this.categories_select,
        this.price_num,
        this.newimgUrl,
        this.desc_textarea,
        this.id
      ).then(res => {
        console.log(res);

        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，修改商品成功",
            type: "success"
          });
          this.imgUrl=this.baseImgUrl + this.newimgUrl
          sessionStorage.setItem("imgUrl", this.imgUrl)
        }
      });
    },
    //获取传过来的数据
    Getgoodsedit() {
      //   console.log(JSON.parse(sessionStorage.goodsedit));
      var goodsedit = JSON.parse(sessionStorage.goodsedit);
      this.goods_name_input = goodsedit.name;
      this.categories_select = goodsedit.categories;
      this.price_num = goodsedit.price;
      this.imgUrl = sessionStorage.imgUrl;
      this.desc_textarea = goodsedit.goodsDesc;
      this.id = goodsedit.id;


      console.log(this.imgUrl);
      
    }
  },
  created() {
    this.Getcategories();
    this.Getgoodsedit();
  }
};
</script>

<style lang="less" scoped>
#goodsadd_box {
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
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
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
.goods_inp {
  // margin-left: 25px;
  margin-bottom: 10px;
  width: 300px;
}
.ml25-bt10 {
  margin-left: 25px;
  margin-bottom: 10px;
}
.ml50-bt10{
      margin-left: 60px;
  margin-bottom: 10px;
  border: 1px solid #000;
}
i {
  margin-left: 80px;
  border: 1px solid #000;
}
.goods_text {
  width: 300px;
}
.ntn_p {
  padding-left: 60px;
  margin-top: 10px;
}
</style>