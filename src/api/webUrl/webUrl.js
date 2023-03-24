import request from "@/utils/request";

// 新增链接接口
export function addLinks(params) {
    return request({
      url: "/api/weblinks/add",
      method: "POST",
      data: params,
    });
}

// 查询所有链接接口
export function getWebUrl(params) {
    return request({
      url: "/api/weblinks",
      method: "GET",
      data: params,
    });
}