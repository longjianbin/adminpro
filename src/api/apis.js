import axios from 'axios';
//设置服务器ip地址
axios.defaults.baseURL = 'http://localhost:5000';
//各种接口


// 登录
export const Api_Login = (account, password) => axios.post('/users/checkLogin', { account, password })

//token验证
export const Api_Checktoken = (token) => axios.get('/users/checktoken', { params: { token } })



/*------------账户管理 ----------------*/



//添加管理员  userGroup用户组
export const Api_Adminadd = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })
//获取账户列表
//currentPage当前页数     pageSize每页条数
export const Api_Adminlist = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
//删除账户
export const Api_Admindel = (id) => axios.get('/users/del', { params: { id } })
//批量删除
export const Api_Adminbatchdel = (ids) => axios.get('/users/batchdel', { params: { ids } })
//编辑
export const Api_Adminedit = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })
//检查添加管理员  用户名查重
export const Api_Checkaccount = (account) => axios.get('/users/checkaccount', { params: { account } })
//检查原密码是否正确
export const Api_Checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })
//修改密码
export const Api_Editpwd = (id, newPwd) => axios.post('/users/editpwd', { id, newPwd })
//个人中心
export const Api_Personal = (id) => axios.get('/users/info', { params: { id } })
//修改头像
export const Api_EditAvatar = (imgUrl, id) => axios.get('/users/avataredit', { params: { imgUrl, id } })



/*---------------------------商品管理-------------------------- */
//分类管理
//获取商品分类列表
export const Api_Catelist = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })
// 获取商品分类名称
export const Api_Categories = () => axios.get('/goods/categories')
//修改商品分类
export const Api_Editcate = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state })
//删除分类
export const Api_Delcate = (id) => axios.get('/goods/delcate', { params: { id } })
//添加分类
export const Api_Addcate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })
//商品管理
//获取商品列表
export const Api_Goodslist = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })
//删除商品
export const Api_Delgoods = (id) => axios.get('/goods/del', { params: { id } })
//添加商品
export const Api_Addgoods = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })
//修改商品
export const Api_Editgoods = (name, category, price, imgUrl, goodsDesc, id) => axios.post('/goods/edit', { name, category, price, imgUrl, goodsDesc, id })


/*---------------------------------订单管理----------------------------- */

//获取列表+查询
export const Api_Orderlist = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/list', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })
//修改订单
export const Api_Orderedit = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('/order/edit', { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })




/*--------------------------------可视化数据管理------------------------- */



//首页可视化数据获取
export const Api_Ordertotaldata = () => axios.get('/order/totaldata')
//订单信息可视化数据获取
export const Api_Ordertotal = () => axios.get('/order/ordertotal')
//根据时间来查询订单
export const Api_Ordertotaltime = (date) => axios.get('/order/ordertotaltime', { params: { date } })




/*---------------------------------店铺管理-------------------------------*/

//获取店铺信息

export const Api_Shopinfo = () => axios.get('/shop/info');
export const Api_Shopedit = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) => axios.post('/shop/edit', { id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics });


