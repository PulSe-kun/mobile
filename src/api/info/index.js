import request from '@/api/http'

//名称一般取自接口最后一个字符
function detailaction(params){//商品详情接口
    return request({
        url: '/bufan/goods/detailaction',
        params
    })
}
export {detailaction}

function addcollect(data){//添加收藏
    return request({
        url: '/bufan/collect/addcollect',
        method:'post',
        data
    })
}
export {addcollect}

function addCart(data){//添加购物车
    return request({
        url: '/bufan/cart/addCart',
        method:'post',
        data
    })
}
export {addCart}