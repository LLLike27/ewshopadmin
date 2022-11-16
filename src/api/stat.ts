import request from "@/utils/request";
/**
 ** @author：LLLike27
 ** @description：首页统计
 ** @date 2022-11-11 20:18
 */

export function stats(params: any) {
  return request({
    url: "/api/admin/index",
    method: "GET",
    params,
  });
}
