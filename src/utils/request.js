import axios from 'axios'
import{MessageBox,Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth.js'

//创建实例

const service =axios.create({
    //url=base url+request url
    baseURL: process.env.VUE_APP_BASE_API,
    timeout:6000
})

//请求拦截器
service.interceptors.request.use(
    config=>{
        if(store.getters.token){
            config.headers['X-Token']=getToken()
        }
        return config

    },
    error=>{
        console.log('request error',error)
        return Promise.reject(error)
    }
)

//响应拦截器
service.interceptors.response.use(
    response=>{
        const res=response.data
        if(res.code !==20000){
            Message({
                message:res.message || 'error',
                type:'error',
                duration:5*1000
            })
            if(res.code ===50008 ||res.code===50012 ||res.code===50014){
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again','Confirm logout',{
                    confirmButtonText:'Re-Login',
                    cancelButtonText:'Cancel',
                    type:'warning'
                }).then(()=>{
                    store.dispatch('user/resetToken').then(()=>{
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'error'))
        }else{
            return res
        }
    },
    error=>{
        console.log('response error',error)
        Message({
            message:error.message,
            type:'error',
            duration:5*1000
        })
        return Promise.reject(error)
    }
)

export default service