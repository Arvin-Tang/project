import router from "@/router";
import axios from "axios";
import { Message, Loading } from "element-ui";

let loading;
// 开始加载
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "loading...",
    background: "rgba(0,0,0,.7)",
  });
}

// 结束加载
function endLoading() {
  loading.close();
}
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost:8088/', // url = base url + request url
  timeout: 10000, // request timeout
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 加载loading
    startLoading();
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 结束加载
    endLoading();
    return response;
  },
  (err) => {
    endLoading();
    Message.error(JSON.stringify(err.response.data) || err.message);

    const { status } = err.response;
    if (status == 401) {
      Message.error("token失效，请重新登陆");
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default service;
