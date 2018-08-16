
import list from '@/pages/list/list'
import index from '@/pages/index'
import login from '@/pages/login'
import register from '@/pages/register'
import recharge from '@/pages/recharge/recharge'  //测试
import list1 from '@/pages/list/list1'   //测试
import authentication from '@/pages/my/authentication'  
import account from '@/pages/my/account' 
import centerindex from '@/pages/center/index' 
import setting from '@/pages/center/setting' 
// 汇率
import morelist from '@/pages/rate/more_list' 
import exchange from '@/pages/rate/exchange' 
import todayrate from '@/pages/rate/today_rate' 
import caculate from '@/pages/rate/caculate' 

//个人中心
import loan from '@/pages/center/loan' 


export default[
    {
      path: '/',
      redirect: '/login' ,  // 当访问根目录的时候默认跳转到主页
      
    },

    {
      path: '/index',
      component: index,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
     
    },
    {
      path: '/list',
      component: list,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/recharge',
      component: recharge,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/list1',
      component: list1,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/authentication',
      component: authentication,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/centerindex',
      component: centerindex,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/account',
      component: account,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/setting',
      component: setting,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/morelist',
      component: morelist,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/exchange',
      component: exchange,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/todayrate',
      component: todayrate,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/caculate',
      component: caculate,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },
    {
      path: '/loan',
      component: loan,
      meta: { 
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
       }, 
    },

  ]



