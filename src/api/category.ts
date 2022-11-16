import request from "@/utils/request";
/**
 ** @author：LLLike27
 ** @description：分类管理
 ** @date 2022-11-11 23:16
 */

// 分类列表
export function categoryList(params: object) {
  return request({
    url: "/api/admin/category",
    method: "GET",
    params,
  });
}

//分类详情
export function categoryInfo(categoryId: number) {
  return request({
    url: `/api/admin/category/${categoryId}`,
    method: "GET",
  });
}

//禁用和启用
export function setCategoryLock(categoryId: number) {
  return request({
    url: `/api/admin/category/${categoryId}/status`,
    method: "PATCH",
  });
}

// 添加分类
export function addCategory(data: any) {
  return request({
    url: "/api/admin/category",
    method: "POST",
    data,
  });
}

//更新分类
export function updateCategory(categoryId: number, data: Object) {
  return request({
    url: `/api/admin/category/${categoryId}`,
    method: "PUT",
    data,
  });
}

//分类排序
export function categorySort(categoryId: number, params: any) {
  return request({
    url: `/api/admin/category/${categoryId}/seq`,
    method: "PATCH",
    params,
  });
}
