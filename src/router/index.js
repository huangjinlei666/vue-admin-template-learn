import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes=[
    {
        path:'/login',
        component:()=>import('@/views/login/index.vue')
    },
    // {
    //     path:'/',
    //     component:Layout,
    //     redirect:'/dashboard',
    //     children:[{
    //         path:'dashboard',
    //         name:'Dashboard',
    //         component:()=>import('@/views/dashboard/index.vue'),
    //         meta:{
    //             title:'Dashboard',
    //             icon:'dashboard'
    //         }
    //     }]
    // }
]

// const router=new VueRouter({
//     routes,
//     mode:'hash'
// })

// export default router;

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
  
  const router = createRouter()
  
  // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
  export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
  
  export default router