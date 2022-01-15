import request from '@/api/http'

function categoryNav(params){ //获取导航数据
    return request({
        url: '/bufan/category/categoryNav',
        params
    })
}
export {categoryNav}

function goodsList(params){ //获取分类商品列表
    return request({
        url: '/bufan/goods/goodsList',
        params
    })
}
export {goodsList}