<template>
  <div class="top clearfix">
    <!-- <div class="header-left" style="float: left;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in arr" :key="item" >{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="header-right" style="float: right;">
      <el-tooltip effect="dark" content="未读消息" placement="bottom">
        <i class="el-icon-bell"></i>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="fullscreen?`取消全屏`:`全屏`"
        placement="bottom"
        class="full-screen"
      >
        <i class="el-icon-rank"></i>
      </el-tooltip>
      <!-- 用户头像 -->
      <div class="user-pic" v-if="isimg">
        <img  id="upAvatar" :src="imgUrl" alt />
      </div>
      <!-- 用户下拉菜单 -->
      <el-dropdown trigger="click" class="drop-down">
        <span class="el-dropdown-link">
          {{showname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/index/personal" class="per_a">个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isimg: true,
      fullscreen: false,
      imgUrl: ""
    };
  },
  methods: {
    Getimg() {
      // this.imgUrl = localStorage.getItem("imgurl");
      if (localStorage.getItem("imgurl") == "") {
        this.isimg = false;
      } else {
        this.imgUrl = localStorage.getItem("imgurl");
      }
    }
  },
  computed: {
    showname() {
      return localStorage.getItem("name")==""?`请登录`:localStorage.getItem("name");
    }
  },

  created() {
    this.Getimg();
  }
};
</script>
<style lang="less">
.top {
  height: 100%;
  padding-right: 30px;

  .header-right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .user-pic {
      margin: 0px 15px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    i {
      color: #fff;
      font-size: 24px;
      margin: 0 10px;
    }
    .full-screen {
      transform: rotate(45deg);
    }
    .drop-down {
      color: #fff;
      i {
        margin: 0;
        font-size: 16px;
      }
      .per_a {
        text-decoration: none;
        color: #333;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
