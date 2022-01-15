import request from '@/api/http'

//名称一般取自接口最后一个字符
function getListAction(params){//获取收货地址列表
    return request({
        url: '/bufan/address/getListAction',
        params
    })
}
export {getListAction}

function saveAction(data){ //保存和跟添加收货地址
    return request({
        url: '/bufan/address/saveAction',
        method:'post',
        data
    })
}
export {saveAction}

function detailAction(params){//获取收货地址详情
    return request({
        url: '/bufan/address/detailAction',
        params
    })
}
export {detailAction}

function deleteAction(params){//删除收货地址
    return request({
        url: '/bufan/address/deleteAction',
        params
    })
}
export {deleteAction}