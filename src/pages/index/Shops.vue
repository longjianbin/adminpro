<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button
          style="float: right; "
          type="primary"
          size="small"
          @click="edit"
        >{{disabled ?"编辑" :"保存"}}</el-button>
      </div>
      <div class="shopinfor">
        <!-- 店铺管理的信息 -->
        <el-form ref="shop" :model="shop" label-width="80px" :disabled="disabled">
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="shop.name"></el-input>
          </el-form-item>
          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input type="textarea" v-model="shop.bulletin" height="50"></el-input>
          </el-form-item>
          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="avatarimg" :src="baseImgUrl+avatarimg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 店铺图片 -->
          <el-form-item label="店铺图片">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleImgSuccess"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <!-- 图片的预览框  -->
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input v-model="shop.deliveryPrice"></el-input>
          </el-form-item>
          <!-- 送达时间 -->
          <el-form-item label="送达时间">
            <el-input v-model="shop.deliveryTime"></el-input>
          </el-form-item>
          <!-- 描述-->
          <el-form-item label="描述">
            <el-input type="textarea" v-model="shop.description"></el-input>
          </el-form-item>
          <!--  评分-->
          <el-form-item label="评分">
            <el-input v-model="shop.score"></el-input>
          </el-form-item>
          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input v-model="shop.sellCount"></el-input>
          </el-form-item>
          <!-- 活动 -->
          <el-form-item label="活动">
            <el-checkbox-group v-model="shop.supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="shop.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
          <!-- 起送价格 -->
          <el-form-item label="起送价格">
            <el-input v-model="shop.minPrice "></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Api_Shopinfo } from "@/api/apis";
import { Api_Shopedit } from "@/api/apis";
export default {
  data() {
    return {
      shop: {
        supports: [],
        date: []
      },

      disabled: true, //默认是禁用
      dialogVisible: false,
      baseImgUrl: "http://127.0.0.1:5000/upload/shop/",
      pics: [], //图片的地址
      fileList: [], // 图片的列表
      avatarimg: "",
      dialogImageUrl: "" // 模态框的图片
    };
  },
  methods: {
    //图片的移出
    handleRemove(file) {
      //console.log(file, fileList);
      //把这个图片从数组里面删除
      this.pics.splice(this.pics.indexOf(file.name), 1);
    },
    //店铺图片的上传
    handleImgSuccess(res) {
      // console.log(res);
      this.pics.push(res.imgUrl);
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传店铺的头像
    handleAvatarSuccess(res) {
      console.log(res.imgUrl);
      if (res.code == 0) {
        //表示的是图片上传成功
        this.avatarimg = res.imgUrl;
      }
    },

    //编辑
    edit() {
      this.disabled = !this.disabled;
      if (this.disabled) {
        Api_Shopedit(
          this.shop.id,
          this.shop.name,
          this.shop.bulletin,
          this.shop.avatar,
          this.shop.deliveryPrice,
          this.shop.deliveryTime,
          this.shop.description,
          this.shop.score,
          this.shop.sellCount,
          JSON.stringify(this.shop.supports),

          JSON.stringify(this.shop.date),
          JSON.stringify(this.shop.pics)
        ).then(res => {
          //console.log(res)
          if (res.data.code) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          }
          this.getShopData();
        });
      }
    },
    //获取店铺的数据
    getShopData() {
      Api_Shopinfo().then(res => {
        console.log(res.data);
        this.shop = res.data.data;
        this.avatarimg = res.data.data.avatar;
        this.pics = res.data.data.pics;
        //定义一个数组保存图片的地址
        let arr = [];
        res.data.data.pics.forEach(v => {
          arr.push({
            name: v,
            url: this.baseImgUrl + v
          });
          //把图片的地址赋值给图片列表
          this.fileList = arr;
        });
      });
    }
  },
  created() {
    this.getShopData();
  }
};
</script>

<style lang="less" scoped>
.box-card {
  .shopinfor {
    width: 400px;
    /deep/ .avatar-uploader .el-upload {
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
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
}
</style>