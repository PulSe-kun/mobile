import request from '@/api/http'

//名称一般取自接口最后一个字符
function cartList(params){//购物车列表
    return request({
        url: '/bufan/cart/cartList',
        params
    })
}
export {cartList}


function deleteAction(params){//删除商品
    return request({
        url: '/bufan/cart/deleteAction',
        params
    })
}
export {deleteAction}

function submitAction(data){//提交订单
    return request({
        url: '/bufan/order/submitAction',
        method:'post',
        data
    })
}
export {submitAction}