import request from "@/utils/request";
/**
 ** @author：LLLike27
 ** @description：登录
 ** @date 2022-11-07 17:32
 */

//登录接口
export function login(data: any) {
  return request({
    url: "/api/auth/login",
    method: "POST",
    data,
  });
}
//用户接口
export function user() {
  return request({
    url: "/api/admin/user",
    method: "GET",
  });
}
//退出登录接口
export function logout() {
  return request({
    url: "/api/auth/logout",
    method: "POST",
  });
}
