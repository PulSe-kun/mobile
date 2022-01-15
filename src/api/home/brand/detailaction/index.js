import request from "@/api/http";

function detailaction(params) {
  //首页品牌制造商直供的详情数据
  return request({
    url: "/bufan/brand/detailaction",
    params,
  });
}
export { detailaction };
