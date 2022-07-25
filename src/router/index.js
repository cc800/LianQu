import {createRouter, createWebHashHistory} from 'vue-router'
import MainPage from "@/components/general/mainPage/MainPage";
import MyLogin from "@/components/general/loginPage/MyLogin";
import {getCurUser, login, showMsgBox} from "@/api/api";

// function _getMainPage(){
//     let u=localStorage.getItem("user")
//     console.log(u)
//     if(u===null)
//         return '/login'
//     else if(u.level==='1')
//         return '/manage/wanManage'
//     else if(u.level==='0')
//         return '/main'
// }

const routes = [
    {path: '/', redirect: '/login'},
    {
        path: '/main',
        name: 'main',
        component: MainPage
    },
    {
        path: '/record',
        name: 'record',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/general/recordPage/RecordPage')
    },
    {
        path: '/letter',
        name: 'letter',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/general/letterPage/LetterPage')
    },
    {
        path: '/login',
        name: 'login',
        component: MyLogin
    },
    {
        path: '/manage/wanManage',
        name: 'wanManage',
        component: () => import('../components/manage/wanManage/MyWan')
    },
    {
        path: '/manage/queManage',
        name: 'queManage',
        component: () => import('../components/manage/queManage/MyQuestion')
    },
    {
        path: '/manage/infManage',
        name: 'infManage',
        component: () => import('../components/manage/infManage/MyInfo')
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

const whiteList = ["/login", "/loginpassword"];
// 全局路由守卫，如果不是登录状态，则到登录页面
router.beforeEach((to, from, next) => {
//验证token存在，则进入该页面
    getCurUser().then((res) => {
        if(to.path==='/login'){
            next();
        }
        else if (res.data !== null)
            if (sessionStorage.getItem('user') !== null) {
                next();
            } else { //否则进入不需要验证token界面,（这里进入的是登录页面）
                if (to.path === "/login" || whiteList.indexOf(to.path) !== -1) {
                    next();
                } else {
                    next("/login");
                }
            }
        else {
            let user=localStorage.getItem("user")
            if(user===null)
                next("/login")
            login(user).then((res)=>{
                if(res.data===null){
                    showMsgBox("您的登录已失效，请重新登录")
                    next("/login")
                }
                else{
                    next()
                }
            })
        }
    })
})

export default router
