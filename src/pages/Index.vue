<template>
  <div class="home">
    <el-container>
      <!-- 左侧栏 -->
      <!-- <el-aside> -->
        <LeftNav></LeftNav>
      <!-- </el-aside> -->
      <!-- 大容器 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Top></Top>
        </el-header>
        <!-- 主要内容 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
        <!-- 页脚 -->
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入组件
import LeftNav from './../components/LeftNav/LeftNav.vue';
import Top from './../components/Top/Top.vue';
import Footer from './../components/Footer/Footer.vue';

export default {
    // 注册组件
    components:{
        LeftNav,
        Top,
        Footer
    }
};
</script>

<style lang='less'>
.home {
    height: 100%;
    .el-container {
      height: 98%;
  
      // .el-aside {
      //   background: #324157;
      // }
      .el-header {
        background: #242F42;
      }
      .el-container {
        .el-main {
          background: #F0F0F0;
          // height:100%;
          padding-top:10px;
        }
        .el-footer {
          background: #F0F0F0;
          height:40px !important;
        }
      }
    }
  }
</style>
