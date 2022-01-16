import request from '@/api/http'

//名称一般取自接口最后一个字符
function detailaction(params){//详情加下方四个专题推荐
    return request({
        url: '/bufan/topic/detailaction',
        params
    })
}
export {detailaction}