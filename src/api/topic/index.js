import request from '@/api/http'

//名称一般取自接口最后一个字符
function listaction(params){
    return request({
        url: '/bufan/topic/listaction',
        params
    })
}
export {listaction}