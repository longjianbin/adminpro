<template>
  <div class="left-nav">
    <div class="logoBox">
      <div class="yj">
        <img src="./../../assets/imgs/logo.png" />野鸡后台管理系统
      </div>
    </div>

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#324157"
      text-color="#fff"
      active-text-color="yellowgreen"
      unique-opened
      router
      :collapse="isCollapse"
    >
      <el-submenu :index=" (key+1)+'' " v-for="(menu,key) in newmenus" :key="key">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item :index="v.path" v-for="(v,i) in menu.submenus" :key="i">{{ v.subtitle }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      // 导航数据菜单
      //  menus:[],
      menus: [
        // 后台首页
        {
          icon: "el-icon-setting",
          title: "系统管理",
          role: ["super", "normal"],
          submenus: [{ path: "/index/", subtitle: "后台首页" }]
        },
        // 订单管理
        {
          icon: "el-icon-document",
          title: "订单管理",
          role: ["super", "normal"],

          submenus: [{ path: "/index/order", subtitle: "订单管理" }]
        },
        // 商品管理
        {
          icon: "el-icon-goods",
          title: "商品管理",
          role: ["super"],

          submenus: [
            { path: "/index/goodslist", subtitle: "商品列表" },
            { path: "/index/goodsadd", subtitle: "商品添加" },
            { path: "/index/goodscate", subtitle: "商品分类" }
          ]
        },
        // 账号管理
        {
          icon: "el-icon-suitcase",
          title: "账号管理",
          role: ["super"],

          submenus: [
            { path: "/index/adminlist", subtitle: "账号列表" },
            { path: "/index/adminadd", subtitle: "添加账号" },
            { path: "/index/changepwd", subtitle: "密码修改" }
          ]
        },

        // 统计管理
        {
          icon: "el-icon-edit-outline",
          title: "店铺管理",
          role: ["super", "normal"],

          submenus: [{ path: "/index/shops", subtitle: "店铺管理" }]
        },
        // 销售统计
        {
          icon: "el-icon-pie-chart",
          title: "销售统计",
          role: ["super"],

          submenus: [
            { path: "/index/goodscount", subtitle: "商品统计" },
            { path: "/index/ordercount", subtitle: "订单统计" }
          ]
        }
      ],
      role: ""
      // menus2:[
      //   // 后台首页
      //   {
      //     icon: "el-icon-setting",
      //     title: "系统管理",
      //     submenus: [{ path: "/index/", subtitle: "后台首页" }]
      //   },
      //   // 订单管理
      //   // {
      //   //   icon: "el-icon-document",
      //   //   title: "订单管理",
      //   //   submenus: [{ path: "/index/order", subtitle: "订单管理" }]
      //   // },
      //   // 商品管理
      //   {
      //     icon: "el-icon-goods",
      //     title: "商品管理",
      //     submenus: [
      //       { path: "/index/goodslist", subtitle: "商品列表" }
      //       // { path: "/index/goodsadd", subtitle: "商品添加" },
      //       // { path: "/index/goodscate", subtitle: "商品分类" }
      //     ]
      //   },
      //   // 账号管理
      //   {
      //     icon: "el-icon-suitcase",
      //     title: "账号管理",
      //     submenus: [
      //       { path: "/index/adminlist", subtitle: "账号列表" },
      //       // { path: "/index/adminadd", subtitle: "添加账号" },
      //       { path: "/index/changepwd", subtitle: "密码修改" }
      //     ]
      //   },

      //   // 统计管理
      //   // {
      //   //   icon: "el-icon-edit-outline",
      //   //   title: "店铺管理",
      //   //   submenus: [
      //   //     { path: "/index/shopadmin", subtitle: "店铺管理" }
      //   //   ]
      //   // },
      //   // 销售统计
      //   {
      //     icon: "el-icon-pie-chart",
      //     title: "销售统计",
      //     submenus: [
      //       { path: "/index/goodscount", subtitle: "商品统计" },
      //       { path: "/index/ordercount", subtitle: "订单统计" }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    collapseChage() {
      this.isCollapse = !this.isCollapse;
    }
    // Getrole(){
    //   this.role=localStorage.role
    //   if(this.role=="super"){
    //     this.menus=this.menus1
    //   }else if(this.role=="normal"){
    //     this.menus=this.menus1.filter(obj,i,this.menus1)
    //   }
    // }
  },
  computed: {
    //根据权限计算出新的需要加载的菜单
    newmenus() {
      // this.role = localStorage.role;
      var newarr = this.menus.filter(item => {
        return item.role.includes(this.role);
      });
      return newarr;

      //简化版
      // return this.
    }
  },
  created() {
    // this.Getrole();
      this.role = localStorage.role;

  }
};
</script>

<style lang="less">
.left-nav {
  width: 200px;
  background: #324157;
  .logoBox {
    height: 60px;
    background: #242f42;
    .yj {
      position: absolute;
      top: 10px;
      left: 15px;
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      img {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
  }
  & > .el-menu:not(.el-menu--collapse) {
    width: 200px;
    margin-top: 20px;
    border-right: none;
    i {
      color: #fff;
    }
  }
  .el-menu--collapse {
    margin-top: 20px;
    border-right: none;
    i {
      color: #fff;
    }
  }
}
</style>

