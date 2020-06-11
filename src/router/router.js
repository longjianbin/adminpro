// 引入核心库
import Vue from 'vue'
import Router from 'vue-router'
import Login from './../pages/Login'

import { Api_Checktoken } from '@/api/apis.js'
// 全局注册路由
Vue.use(Router)
// 解决同一个路由多次添加出现的问题
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const router = new Router({
  routes: [
    // 登录
    {
      path: '/',
      name: 'login',
      component: Login
    },
    // 主页面
    {
      path: '/index/',
      name: 'index',
      component: () => import('./../pages/Index'),
      // redirect:'/home/index',
      //二级路由
      children: [
        //首页
        {
          path: '/index',
          name: 'home',
          meta: ["super", "normal"],
          component: () => import('./../pages/index/Home')
        },
        //订单管理
        {
          path: '/index/order',
          name: 'order',
          meta: ["super", "normal"],
          component: () => import('./../pages/index/Order')
        },
        //商品统计
        {
          path: '/index/goodscount',
          name: 'goodcount',
          meta: ["super"],
          component: () => import('./../pages/index/GoodsCount')
        },
        //订单统计
        {
          path: '/index/ordercount',
          name: 'ordercount',
          meta: ["super"],
          component: () => import('./../pages/index/OrderCount')
        },
        //订单详情
        {
          path: '/index/orderdetails',
          name: 'orderdetails',
          meta: ["super"],
          component: () => import('./../pages/index/OrderDetails')
        },
        //商品列表
        {
          path: '/index/goodslist',
          name: 'goodslist',
          meta: ["super"],
          component: () => import('./../pages/index/Goodslist')
        },
        //商品添加
        {
          path: '/index/goodsadd',
          name: 'goodsadd',
          meta: ["super"],
          component: () => import('./../pages/index/Goodsadd')
        },
        //商品编辑
        {
          path: '/index/goodsedit',
          name: 'goodsedit',
          meta: ["super"],
          component: () => import('./../pages/index/Goodsedit')
        },
        //商品分类
        {
          path: '/index/goodscate',
          name: 'goodscate',
          meta: ["super"],
          component: () => import('./../pages/index/Goodscate')
        },
        //账号管理
        //账号列表
        {
          path: '/index/adminlist',
          name: 'adminlist',
          meta: ["super"],
          component: () => import('./../pages/index/Adminlist')
        },
        //添加用户
        {
          path: '/index/adminadd',
          name: 'adminadd',
          meta: ["super"],
          component: () => import('./../pages/index/Adminadd')
        },
        //修改密码
        {
          path: '/index/changepwd',
          name: 'achangepwd',
          meta: ["super"],
          component: () => import('./../pages/index/Changepwd')
        },
        //店铺管理
        {
          path: '/index/shops',
          name: 'shops',
          meta: ["super", "normal"],
          component: () => import('./../pages/index/Shops')
        },
        //个人中心
        {
          path: '/index/personal',
          name: 'personal',
          meta: ["super"],
          component: () => import('./../pages/index/Personal')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to,from);
  if (to.path != "/") {
    Api_Checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        if (to.meta.includes(localStorage.role)) {
          next()
        } else {
          next(from)
        }

      } else next('/')
    })
  }
  else next()
})
export default router