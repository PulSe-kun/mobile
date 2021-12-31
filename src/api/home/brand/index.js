import request from '@/api/http'

function listaction(params){ //首页品牌制造商
    return request({
        url: '/bufan/brand/listaction',
        params
    })
}
export {listaction}