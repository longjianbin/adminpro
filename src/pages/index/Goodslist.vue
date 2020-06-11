<template>
  <div id="list_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%" height="350">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <!-- {{scope.row.imgUrl}} -->
            <img :src="scope.row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 30, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Api_Goodslist } from "@/api/apis.js";
import { Api_Delgoods } from "@/api/apis.js";

export default {
  methods: {
    //点击编辑
    handleEdit(row) {
      console.log(row);
      console.log(row.imgUrl);
      
      sessionStorage.setItem("goodsedit",JSON.stringify(row))
      sessionStorage.setItem("imgUrl",row.imgUrl)
      this.$router.push('/index/goodsedit')

    },
    //点击删除
    handleDelete(row) {
      console.log(row.id);
      Api_Delgoods(row.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.Showgoodslist();
        } else {
          this.$message.error({
            message: "删除失败"
          });
        }
      });
    },
    //每页可装条数改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.Showgoodslist();
    },
    //当前页改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.Showgoodslist();
    },
    //获取商品列表信息
    Showgoodslist() {
      Api_Goodslist(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        // console.log(res.data.data);
      });
    }

  },
  created() {
    this.Showgoodslist();
  },
  data() {
    return {
      categories:"",
      currentPage: 1,
      pageSize: 10,
      total: 4,
      src:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591270996485&di=45fca6fb277595cd091485ab9b8fcf6e&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F9972960562%2F0.jpg",
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          price: "￥88",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          price: "￥88",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          price: "￥88",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          price: "￥88",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#list_box {
  width: 100%;
  height: 88%;

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
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
img {
  width: 50px;
  height: 30px;
  //   border: 1px solid #000;
}
</style>