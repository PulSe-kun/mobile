import request from '@/api/http'

function indexaction(){ //分类导航数据获取
    return request({
        url: '/bufan/category/indexaction',
    })
}
export {indexaction}

function currentaction(params){ //通过分类的id来查询分类列表数据
    return request({
        url: '/bufan/category/currentaction',
        params
    })
}
export {currentaction}