import request from "@/utils/request";

// 注册接口
export function register(params) {
  return request({
    url: "/api/users/register",
    method: "POST",
    data: params,
  });
}


// 注册接口
export function login(params) {
  return request({
    url: "/api/users/login",
    method: "POST",
    data: params,
  });
}
