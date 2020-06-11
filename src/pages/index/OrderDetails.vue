<template>
  <div id="goodsadd_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <el-button @click="edit" type="primary" v-if="isedit">编辑</el-button>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        订单号：
        <el-input v-model="orderform.orderNo" class="goods_inp" disabled></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        下单时间：
        <el-date-picker
          v-model="orderform.orderTime"
          type="datetime"
          placeholder="选择日期时间"
          :disabled="isedit"
        ></el-date-picker>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        手机号：
        <el-input v-model="orderform.phone" class="goods_inp" :disabled="isedit"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        收货人：
        <el-input v-model="orderform.consignee" class="goods_inp" :disabled="isedit"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        配送地址：
        <el-input v-model="orderform.deliverAddress" class="goods_inp" :disabled="isedit"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        送达时间：
        <el-date-picker
          v-model="orderform.deliveryTime"
          type="datetime"
          placeholder="选择日期时间"
          :disabled="isedit"
        ></el-date-picker>
      </div>

      <div class="demo-input-suffix ml25-bt10">
        用户备注：
        <el-input v-model="orderform.remarks" class="goods_inp" :disabled="isedit"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        订单金额：
        <el-input v-model="orderform.orderAmount" class="goods_inp" :disabled="isedit"></el-input>
      </div>
      <div class="demo-input-suffix ml25-bt10">
        订单状态：
        <el-input v-model="orderform.orderState" class="goods_inp" :disabled="isedit"></el-input>
      </div>

      <p class="btn_p">
        <el-button type="primary" @click="editclick" v-if="!isedit">确认修改</el-button>
        <el-button type="primary" @click="Backclick">返回</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { Api_Orderedit } from "@/api/apis.js";
import moment from "moment";
export default {
  data() {
    return {
      isedit: true,
      orderform: {
        // consignee: "汪小哥",
        // deliverAddress: "天府新谷",
        // deliveryTime: "2020-04-16T02:44:58.000Z",
        // id: 21,
        // orderAmount: 30,
        // orderNo: "16013",
        // orderState: "已完成",
        // orderTime: "2020-06-04T09:35:19.000Z",
        // phone: "18181358998",
        // remarks: "不要辣"
      }
    };
  },
  methods: {
    edit() {
      this.isedit = false;
    },
    editclick() {
      // console.log(1111);
      // console.log(this.orderform);
      Api_Orderedit(
        this.orderform.id,
        this.orderform.orderNo,
        // this.orderform.orderTime,
        moment(this.orderform.orderTime).format("YYYY-MM-DD HH:mm:ss"),
        this.orderform.phone,
        this.orderform.consignee,
        this.orderform.deliverAddress,
        moment(this.orderform.deliveryTime).format("YYYY-MM-DD HH:mm:ss"),
        this.orderform.remarks,
        this.orderform.orderAmount,
        this.orderform.orderState
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，修改商品成功",
            type: "success"
          });
          this.isedit = true;
        }
      });
      // console.log(this.orderform.orderTime);
      // console.log(moment(this.orderform.deliveryTime).format());
    },
    Backclick() {
      this.$router.push("/index/order");
    },
    Getorder() {
      this.orderform = JSON.parse(sessionStorage.order);
      //   this.orderform.deliveryTime = this.orderform.deliveryTime;
      //   this.orderform.orderTime = this.orderform.orderTime ;
    }
  },
  created() {
    this.Getorder();
  }
};
</script>

<style lang="less" scoped>
#goodsadd_box {
  width: 100%;
  height: 96%;
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

  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
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

.goods_text {
  width: 300px;
}
.ntn_p {
  padding-left: 60px;
  margin-top: 10px;
}
</style>