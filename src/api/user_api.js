// 导入axios实例
import httpRequest from '@/request/index'
let url_head='/api/user'
//user  ********************************************************************
export function user_testEmail() {
    return httpRequest({
        url: url_head+'/emailTest',
        method: 'get'
    })
}
