<template>
  <div id="adminlist_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.ctime | dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <!-- 修改用户的框 -->
            <el-popover placement="left" width="400" trigger="click" :disabled="ishide">
              <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                <el-form-item label="管理员id">
                  <el-input v-model="formLabelAlign.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input v-model="formLabelAlign.account"></el-input>
                </el-form-item>
                <el-form-item label="用户组">
                  <el-select v-model="value" :placeholder="formLabelAlign.userGroup">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                  </el-select>

                  <p style="margin-top:5px;">
                    <el-button type="danger" @click="Editok">保存</el-button>
                    <el-button type="primary" @click="Editno">取消</el-button>
                  </p>
                </el-form-item>
              </el-form>
              <el-button
                size="mini"
                slot="reference"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </el-popover>
            <el-popconfirm
              title="确定删除吗？"
              confirmButtonType="danger"
              @onConfirm="handleDelete(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-popconfirm title="选中内容确定删除吗？" confirmButtonType="danger" @onConfirm="toggledel">
          <el-button slot="reference" type="danger">批量删除</el-button>
        </el-popconfirm>
        <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//显示
import { Api_Adminlist } from "@/api/apis.js";
//删除
import { Api_Admindel } from "@/api/apis.js";
//批量删除
import { Api_Adminbatchdel } from "@/api/apis.js";
//编辑
import { Api_Adminedit } from "@/api/apis.js";

export default {
  data() {
    return {
      value: "",
      ishide: false,
      //修改数据
      formLabelAlign: {
        id: "",
        account: "",
        userGround: ""
      },
      //当前页数和吗，每页最多条数
      currentPage: 1,
      pageSize: 100,
      total: 10,
      //表格数据
      tableData: [
        {
          acc: "小明",
          type: "超级管理员",
          addtime: "2016-05-03"
        },
        {
          acc: "张三",
          type: "普通管理员",
          addtime: "2016-05-03"
        },
        {
          acc: "李四",
          type: "超级管理员",
          addtime: "2016-05-03"
        },
        {
          acc: "小红",
          type: "超级管理员",
          addtime: "2016-05-03"
        }
      ],
      //勾选的数据
      multipleSelection: [],
      //批量删除
      ids: []
    };
  },

  methods: {
    //编辑
    handleEdit(index, row) {
      // console.log(index, row);
      // console.log(row.id);
      this.formLabelAlign.id = row.id;
      this.formLabelAlign.account = row.account;
      this.value = row.userGroup;
      this.ishide = false;
    },
    //保存编辑
    Editok() {
      Api_Adminedit(
        this.formLabelAlign.id,
        this.formLabelAlign.account,
        this.value
      ).then(res => {
        if (res.data.code == 0) {
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
      this.showadmin();
    },
    //取消编辑
    Editno() {
      // console.log(1111);
      this.ishide = true;
    },
    //删除
    handleDelete(index) {
      // console.log(index);
      Api_Admindel(index).then(res => {
        // console.log(res.data.data);

        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，删除成功",
            type: "success"
          });
          this.showadmin();
        } else {
          this.$message.error({
            message: "很抱歉，删除失败"
          });
        }
      });
    },
    //批量删除
    toggledel() {
      this.$refs.multipleTable.selection.forEach(v => {
        this.ids.push(v.id);
      });
      // console.log(JSON.stringify(this.ids));
      Api_Adminbatchdel(JSON.stringify(this.ids)).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，删除成功",
            type: "success"
          });
          this.showadmin();
        } else {
          this.$message.error({
            message: "很抱歉，删除失败"
          });
        }
      });
    },
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
    },
    //最大条数显示改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.showadmin();
    },
    //当前页数改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.showadmin();
    },
    //加载界面
    showadmin() {
      Api_Adminlist(this.currentPage, this.pageSize).then(res => {
        // console.log(res.data.data);
        this.tableData = res.data.data;
        this.total = res.data.total;
        // console.log(this.tableData);
        // console.log(this);
      });
    }
  },
  created() {
    this.showadmin();
  }
};
</script>

<style lang="less" scoped>
#adminlist_box {
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