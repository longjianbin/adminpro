<template>
  <div id="index_box">
    <div class="top_all_box">
      <div v-for="item in topinfo" :key="item.name" class="top_box">
        <img :src="item.src" />
        <div>
          <p>{{item.name}}</p>
          <p>{{item.num}}</p>
        </div>
      </div>
    </div>
    <div class="char_box">
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
  </div>
</template>

<script>
//使用import引入
import png1 from "./../../assets/imgs/index-top1.png";
import png2 from "./../../assets/imgs/index-top2.png";
import png3 from "./../../assets/imgs/index-top3.png";
import png4 from "./../../assets/imgs/index-top4.png";
import { Api_Ordertotaldata } from "@/api/apis.js";
import { Api_Checktoken } from "@/api/apis.js";
export default {
  data() {
    return {
      darwdata: {},
      topinfo: [
        { src: png1, name: "总订单", num: 102400 },
        { src: png2, name: "总销售额", num: 102400 },
        { src: png3, name: "今日订单数", num: 102400 },
        { src: png4, name: "今日销售额", num: 102400 }
      ]
      // arrorder: [],
      // arrxData: [],

      // arramount: []
    };
  },
async  created() {
    // console.log([sessionStorage.arrorder]);
    // console.log([sessionStorage.arrxData]);
    // console.log([sessionStorage.arramount]);

    // this.Getdrawinfo();

    // console.log(localStorage.token);

await    Api_Checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        console.log("ok");
      } else {
        localStorage.name = "请登录";
        localStorage.imgurl = "";
      }
      // console.log(res);
    });
    console.log(this.darwdata);
    
  },
  // beforeMount() {
  //   this.Getdrawinfo();
  // },
  mounted() {
    // this.Getdrawinfo();
    this.DrawLine();
  },
  methods: {
    // Getdrawinfo() {
    //   Api_Ordertotaldata().then(res => {
    //     this.darwdata = res.data;
    //     // console.log(res.data);
    //     // console.log(this.darwdata);

   

    //   });
    // },
    async DrawLine() {
      await Api_Ordertotaldata().then(res => {
        this.darwdata = res.data;
        console.log(this.darwdata);
             //总订单数
        this.topinfo[0].num = this.darwdata.totalOrder;
        this.topinfo[1].num = this.darwdata.totalAmount;
        this.topinfo[2].num = this.darwdata.todayOrder;
        this.topinfo[3].num = this.darwdata.totayAmount;
      });
      console.log("1111" + this.darwdata);
      console.log(this);
      console.log(this.darwdata);

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
          data: ["订单统计", "金额统计"]
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
          data: this.darwdata.xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单统计",
            type: "line",
            stack: "总量",
            data: this.darwdata.orderData
          },
          {
            name: "金额统计",
            type: "line",
            stack: "总量",
            data: this.darwdata.amountData
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
#index_box {
  width: 100%;
  height: 88%;

  .top_all_box {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    .top_box {
      width: 20%;
      height: 100px;
      background-color: #fff;
      position: relative;
      border-radius: 10px;
      img {
        margin-top: 20px;
        margin-left: 15%;
      }
      div {
        position: absolute;
        right: 20px;
        top: 20px;
        p {
          margin-top: 5px;
          text-align: center;
        }
      }
    }
  }
  .char_box {
    margin: 0 auto;
    width: 96%;
    height: 80%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>