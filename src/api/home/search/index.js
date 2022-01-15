import request from '@/api/http'

function helperaction(params){ //搜索提示接口
    return request({
        url: '/bufan/search/helperaction',
        params
    })
}
function indexaction(params){ //关键词和搜索历史接口
    return request({
        url: '/bufan/search/indexaction',
        params
    })
}
function addhistoryaction(data){ //搜索的关键词添加到数据库
    return request({
        url: '/bufan/search/addhistoryaction',
        method:'post',
        data
    })
}
function clearhistoryAction(data){ //清空搜索历史接口
    return request({
        url: '/bufan/search/clearhistoryAction',
        method:'post',
        data
    })
}
export {helperaction,indexaction,addhistoryaction,clearhistoryAction}