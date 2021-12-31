import request from '@/api/http'

//名称一般取自接口最后一个字符
function index(){
    return request({
        url: '/bufan/index/index'
    })
}
export {index}