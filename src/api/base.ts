import request from "@/utils/request";
/**
 ** @author：LLLike27
 ** @description： OSS token
 ** @date 2022-11-15 20:34
 */

//图片上传
export function uploadToken() {
  return request({
    url: "/api/auth/oss/token",
    method: "GET",
  });
}
