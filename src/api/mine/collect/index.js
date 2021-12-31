import request from '@/api/http'

//名称一般取自接口最后一个字符
function listAction(params){
    return request({
        url: '/bufan/collect/listAction',
        params
    })
}
export {listAction}