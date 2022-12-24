// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'
import rate from "@/components/ratings/Ratings.vue"
import goods from "@/components/Goods/goods.vue"
import seller from "@/components/seller/sellers.vue"

Vue.config.productionTip = false

// 安装vue-router插件
Vue.use(VueRouter);
// 如果在其他组件中使用axios命令，需要改写为Vue原型属性
Vue.prototype.$axios = Axios;


// 定义路由
const routes = [{
            path: '/',
            redirect: "/goods"
        },
        {
            path: '/goods',
            component: goods
        },
        {
            path: '/ratings',
            component: rate
        },
        {
            path: '/sellers',
            component: seller
        }
    ]
    // 创建路由实例
const router = new VueRouter({
    routes,
    // 选中后的类名
    linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router
    // 4. 创建和挂载根实例
})