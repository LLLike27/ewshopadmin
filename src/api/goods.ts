import request from "@/utils/request";
/**
 ** @author：LLLike27
 ** @description：商品管理
 ** @date 2022-11-12 20:20
 */

// 商品列表
export function goodsList(params: object) {
  return request({
    url: "/api/admin/goods",
    method: "GET",
    params,
  });
}

// 添加商品
export function addGood(data: object) {
  return request({
    url: "/api/admin/goods",
    method: "POST",
    data,
  });
}

// 商品详情
export function getGoodInfo(goodId: number) {
  return request({
    url: `/api/admin/goods/${goodId}`,
    method: "GET",
  });
}

// 修改商品
export function changeGood(goodId: number, data: object) {
  return request({
    url: `/api/admin/goods/${goodId}`,
    method: "PUT",
    data,
  });
}

// 上架和下架
export function getGoodLock(goodId: number) {
  return request({
    url: `/api/admin/goods/${goodId}/on`,
    method: "PATCH",
  });
}

// 推荐和不推荐
export function recommendGood(goodId: number) {
  return request({
    url: `/api/admin/goods/${goodId}/recommend`,
    method: "PATCH",
  });
}
