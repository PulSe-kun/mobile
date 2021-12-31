import request from "@/api/http.js";

function detailAction(params) {
  return request({
    url: "/bufan/order/detailAction",
    params,
  });
}

export { detailAction };
