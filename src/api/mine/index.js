import request from '@/api/http'

//名称一般取自接口最后一个字符
function submitAction(data){
    return request({
        url: '/bufan/feedback/submitAction',
        method:'post',
        data
    })
}
export {submitAction}