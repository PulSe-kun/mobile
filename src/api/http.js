import axios from "axios";
import { Toast } from "vant";

let host;
// 可以通过process.env.NODE_ENV  实现接口域名的一键切换
if (process.env.NODE_ENV == "development") {
  host = "http://shop.bufantec.com/";
} else {
  host = "http://shop.bufantec.com/";
}

var instance = axios.create({
  baseURL: host,
  timeout: 8000,
});

var loading;

instance.interceptors.request.use(
  function (config) {
    loading = Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    return config;
  },
  function (error) {
    // 对请求失败做处理
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    loading.clear();
    return config.data;
  },
  function (error) {
    loading.clear();
    return Promise.reject(error);
  }
);

export default instance;
// export { instance };//注意导入 需要使用import { instance  且名称需要一致 }
// export default {instance};//注意导入 需要使用import 可以import a
