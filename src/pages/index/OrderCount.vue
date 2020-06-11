<template>
  <div id="Oc_box">
    <div class="top_box">
      时间范围:
      <el-date-picker
        class="time_box"
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur="getTime"
      ></el-date-picker>
    </div>
    <div class="echar_box">
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
  </div>
</template>

<script>
import { Api_Ordertotal } from "@/api/apis.js";
import { Api_Ordertotaltime } from "@/api/apis.js";
import moment from "moment";
export default {
  data() {
    return {
      value1: "",
      chartdata: [],
      arrorder: [],
      arrxData: [],
      arrorder1: [],
      arrxData1: []
    };
  },
  methods: {
    //时间改变  chart图像改边
    async getTime() {
      console.log(this.value1);
      this.value1 = [
        moment(this.value1[0]).format(),
        moment(this.value1[1]).format()
      ];
      // console.log(this.value1);
      await Api_Ordertotaltime(JSON.stringify(this.value1)).then(res => {
        this.chartdata = res.data.data;
        console.log(this.chartdata);
        this.arrorder1 = [];
        this.arrxData1 = [];
        for (let i in this.chartdata) {
          this.arrorder1.push(this.chartdata[i].orderAmount);
          this.arrxData1.push(
            moment(this.chartdata[i].orderTime).format("YYYY-MM-DD HH:mm:ss")
          );
        }
        if (this.arrorder1.length == 0) {
          this.$message({
            message: "未查询到数据",
            type: "success"
          });
        } else {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            title: {
              text: "数据统计"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["订单金额"]
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "1%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: this.arrxData1
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                name: "订单金额",
                type: "line",
                stack: "总量",
                data: this.arrorder1
              }
            ]
          });
        }
        // console.log(this.chartdata[i].orderAmount);

        console.log(this.arrxData1);
        console.log(this.arrorder1);
      });
    },
    async Getordertotal() {
      await Api_Ordertotal().then(res => {
        this.chartdata = res.data.data;
      });
    },
    async DrawLine() {
      await Api_Ordertotal().then(res => {
        // console.log(res);
        this.chartdata = res.data.data;
      });
      // console.log(this.chartdata);
      for (let i in this.chartdata) {
        this.arrorder.push(this.chartdata[i].orderAmount);
        this.arrxData.push(
          moment(this.chartdata[i].orderTime).format("YYYY-MM-DD HH:mm:ss")
        );
        // console.log(this.chartdata[i].orderAmount);
      }
      // console.log(this.arrxData);
      // console.log(this.arrorder);

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单金额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.arrxData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单金额",
            type: "line",
            stack: "总量",
            data: this.arrorder
          }
        ]
      });
    }
  },
  created() {
    this.Getordertotal();
    // console.log(1111);
  },
  mounted() {
    this.DrawLine();
    // console.log(22222);
  }
};
</script>

<style lang="less" scoped>
#Oc_box {
  width: 100%;
  height: 88%;

  .top_box {
    margin-left: 2%;
    color: gray;
    font-size: 18px;

    //   height: 100px;
    width: 100%;
    .time_box {
      margin-left: 2%;
    }
  }
  .echar_box {
    margin: 0 auto;
    width: 96%;
    height: 80%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>