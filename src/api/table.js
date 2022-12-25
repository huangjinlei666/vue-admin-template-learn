import request from '@/utils/request.js'

export function getList(params){
    return request({
        url:'/vue-admin-template/table/list',
        method:'get',
        params
    })
}