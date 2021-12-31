import request from '@/api/http'

function goodsList(params){ //首页新品首发与人气推荐
    return request({
        url: '/bufan/goods/goodsList',
        params
    })
}
export {goodsList}  