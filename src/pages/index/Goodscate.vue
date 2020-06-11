<template>
  <div id="goodscate_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类</span>
        <el-popover
          placement="right"
          width="400"
          trigger="click"
          :disabled="ishide"
          style="float: right;"
        >
          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="分类名称">
              <el-input v-model="formLabelAlign.cateName"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="value" :placeholder="formLabelAlign.state">
                <el-option label="开启" value="1"></el-option>
                <el-option label="关闭" value="0"></el-option>
              </el-select>
              <p style="margin-top:5px;">
                <el-button type="danger" @click="Addok">保存</el-button>
                <el-button type="primary" @click="Addno">取消</el-button>
              </p>
            </el-form-item>
          </el-form>
          <el-button size="mini" slot="reference" @click="AddEdit">添加分类</el-button>
        </el-popover>
      </div>
      <el-table :data="tableData" height="350" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="cateName" label="分类名称" width="180"></el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <!-- <pre>{{scope}}</pre> -->
            <el-switch
              v-model="scope.row.state"
              @change="Changestate(scope.$index,scope.row)"
              active-color="#00A854"
              inactive-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover placement="left" width="400" trigger="click" :disabled="isedithide">
              <el-form label-position="right" label-width="80px" :model="formLabelAlign1">
                <el-form-item label="分类名称">
                  <el-input v-model="formLabelAlign1.cateName"></el-input>
                </el-form-item>
                <p style="margin-top:5px;">
                  <el-button type="danger" @click="Editok">保存</el-button>
                  <el-button type="primary" @click="Editno">取消</el-button>
                </p>
              </el-form>
              <el-button
                size="mini"
                slot="reference"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </el-popover>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Api_Catelist } from "@/api/apis.js";
import { Api_Editcate } from "@/api/apis.js";
import { Api_Delcate } from "@/api/apis.js";
import { Api_Addcate } from "@/api/apis.js";
export default {
  methods: {
    //添加分类
    Addok() {
      // console.log(11111);
      // console.log(this.formLabelAlign.cateName, this.value);

      Api_Addcate(this.formLabelAlign.cateName, this.value).then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          this.$message({
            message: "恭喜你，保存成功",
            type: "success"
          });
        } else {
          this.$message.error({
            message: "很抱歉，保存失败"
          });
        }
      });
      this.ishide = true;
      this.Showcatelist();
    },
    Addno() {
      this.ishide = true;
      this.Showcatelist();
    },
    AddEdit() {
      this.ishide = false;
    },
    //修改分类
    Editok() {
      // console.log(1111);
      console.log(this.formLabelAlign1.cateName);
      console.log(this.formLabelAlign1.id);
      console.log(this.formLabelAlign1.state);
      Api_Editcate(
        this.formLabelAlign1.id,
        this.formLabelAlign1.cateName,
        this.formLabelAlign1.state
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，保存成功",
            type: "success"
          });
        }
      });
      this.isedithide = true;
      this.Showcatelist();
      this.formLabelAlign1.id = "";
      this.formLabelAlign1.cateName = "";
      this.formLabelAlign1.state = 1;
    },
    Editno() {
      this.isedithide = true;
      this.Showcatelist();
    },
    handleEdit(index, row) {
      this.isedithide = false;
      this.formLabelAlign1.cateName = row.cateName;
      this.formLabelAlign1.id = row.id;
      this.formLabelAlign1.state = row.state === true ? "1" : "0";
      console.log(index, row);
    },
    //删除
    handleDelete(row) {
      console.log(row);
      Api_Delcate(row.id).then(res => {
        // console.log(res.data.data);

        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，删除成功",
            type: "success"
          });
          this.Showcatelist();
        } else {
          this.$message.error({
            message: "很抱歉，删除失败"
          });
        }
      });
    },
    //获取页面最多条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.Showcatelist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.Showcatelist();
    },
    //状态开关改变
    Changestate(val, row) {
      // console.log(val, row);
      this.tableData[val].id = row.id;
      this.tableData[val].cateName = row.cateName;
      this.tableData[val].state = row.state === true ? "1" : "0";
      Api_Editcate(
        this.tableData[val].id,
        this.tableData[val].cateName,
        this.tableData[val].state
      ).then(res => {
        if (res.data.code === 0) {
          console.log(111);

          this.Showcatelist();
        }
      });
    },
    Showcatelist() {
      Api_Catelist(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        // console.log(this.tableData);

        this.total = res.data.total;
        for (let i in this.tableData) {
          if (this.tableData[i].state == 1) {
            this.tableData[i].state = true;
          } else if (this.tableData[i].state == 0) {
            this.tableData[i].state = false;
          }
        }
        // console.log(res.data.data);
      });
    }
  },
  data() {
    return {
      value: "",
      ishide: false,
      isedithide: false,
      formLabelAlign: {
        // id: "",
        cateName: ""
        // state: ""
      },
      formLabelAlign1: {
        id: "",
        cateName: "",
        state: ""
      },
      // a: "",
      currentPage: 1,
      pageSize: 10,
      total: 4,
      tableData: [
        {
          cateId: 1,
          catename: "热销榜",
          state: true
        },
        {
          cateId: 2,
          catename: "单入精彩套餐",
          state: false
        },
        {
          cateId: 3,
          catename: "冰爽饮品限时特惠",
          value: true
        },
        {
          cateId: 4,
          catename: "精选热菜",
          state: true
        },
        {
          cateId: 5,
          catename: "爽口凉菜",
          state: true
        }
      ]
    };
  },
  created() {
    this.Showcatelist();
  }
};
</script>

<style lang="less" scoped>
#goodscate_box {
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

.box-card {
  //   width: 480px;
  margin: 0 auto;
  width: 96%;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
}
</style>