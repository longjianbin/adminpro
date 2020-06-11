<template>
  <div id="order_box">
    <div class="sreach_box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.orderid" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="formInline.state" placeholder="订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="其他" value=null></el-option>
          </el-select>
        </el-form-item>
        <div class="block">
          <span class="demonstration">选择时间</span>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @blur="getTime"
          ></el-date-picker>
          <el-form-item style="margin-left:20px;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table_box">
      <el-table :data="tableData" border style="width: 100%" center height="380">
        <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间">
          <template slot-scope="scope">{{scope.row.orderTime | dataFormat}}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间">
          <template slot-scope="scope">{{scope.row.deliveryTime | dataFormat}}</template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { Api_Orderlist } from "@/api/apis.js";
import moment from "moment";
export default {
  methods: {
    //获取查询的时间
    getTime() {
      // console.log(this.value);
      if (this.value == null) {
        this.data = null;
      } else {
        this.data = [
          moment(this.value[0]).format("YYYY-MM-DD HH-mm-ss"),
          moment(this.value[1]).format("YYYY-MM-DD HH-mm-ss")
        ];
        // console.log(JSON.stringify(this.data));
      }
    },
    handleClick(row) {
      console.log(row);
      sessionStorage.setItem("order", JSON.stringify(row));
      this.$router.push("/index/orderdetails");
    },
    onSubmit() {
      // console.log( typeof this.formInline.state);
      
      Api_Orderlist(
        this.currentPage,
        this.pageSize,
        this.formInline.orderid,
        this.formInline.consignee,
        this.formInline.phone,
        this.formInline.state,
        JSON.stringify(this.data)
      ).then(res => {
        if (res.data.data.length !== 0) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        } else {
          this.$message.error({
            message: "很抱歉，未搜索到数据"
          });
        }
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.Showorderlist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.Showorderlist();
    },
    //获取订单列表信息
    Showorderlist() {
      Api_Orderlist(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  created() {
    this.Showorderlist();
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 10,
      value: [],
      data: [],
      formInline: {
        orderid: "",
        phone: "",
        state: "",
        consignee: ""
      },
      tableData: [
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        },
        {
          orderid: "14214314",
          startTime: "19:00:00",
          phone: 1818158998,
          consignee: "小明",
          address: "成都市武侯区天府新谷1518弄",
          okTime: "19:32:00",
          remarks: "微辣",
          money: 108,
          state: "已受理"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#order_box {
  width: 100%;
  height: 98%;
}
</style>

