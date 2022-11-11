import request from "@/utils/request";
/**
 ** @author：LLLike27
 ** @description：用户管理
 ** @date 2022-11-07 17:31
 */
//获取用户列表
export function users(params: any) {
  return request({
    url: "/api/admin/users",
    method: "GET",
    params,
  });
}
//禁用和启用
export function setUserLock(userId: any) {
  return request({
    url: `/api/admin/users/${userId}/lock`,
    method: "PATCH",
  });
}
//获取用户信息
export function getUserInfo(userId: any) {
  return request({
    url: `/api/admin/users/${userId}`,
    method: "GET",
  });
}
//更新用户信息
export function updateUserInfo(userId: any, data: Object) {
  return request({
    url: `/api/admin/users/${userId}`,
    method: "PUT",
    data,
  });
}
//添加用户
export function addUser(data) {
  return request({
    url: `/api/admin/users`,
    method: "POST",
    data,
  });
}
