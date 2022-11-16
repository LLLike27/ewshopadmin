/**
 ** @author：LLLike27
 ** @description：Axios的二次封装
 ** @date 2022-11-06 11:19
 */
// 1.引入axios依赖包
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
// 2.axios创建request实例对象
const request = axios.create({
  baseURL: "https://api.shop.eduwork.cn/", // 管理后台要使用的接口的基地址
  // baseURL: "https://shop.api.eduwork.cn/", // 管理后台要使用的接口的基地址
  // baseURL: "http://apishop.test/", // 管理后台要使用的接口的基地址
  timeout: 5000, // 超时时间
});

// 处理  类型“AxiosResponse<any, any>”上不存在属性“name”。ts脑壳疼！关键一步。
declare module "axios" {
  interface AxiosResponse<T = any> {
    name: "";
    email: "";
    accessid: "";
    policy: "";
    signature: "";
    host: "";
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const win: any = window;
//3.添加请求拦截器，请求发出之前触发的
request.interceptors.request.use(
  (config) => {
    // 如果API需要认证， 在这统一设置
    // config 接口请求的配置信息
    // 1，获取token
    const token = localStorage.getItem("token");
    // 2,判断token是否存在
    if (token) {
      // 3，如果存在，添加到请求头参数中    内置的并没有这个变量所以我们要告诉ts这个东西是一定存在的 就是在变量前加一个!
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 报错的是定义前置拦截器时候抛出一个错误信息
    return Promise.reject(error);
  }
);
// 4.添加响应拦截器，请求响应之后触发的
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //解构error中响应回来的错误
    const { response } = error;
    console.log(response);
    // 报错的是定义前置拦截器时候抛出一个报错信息
    switch (response.status) {
      case 401:
        win.$message.error("登陆失败，请重新登录");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        break;
      case 404:
        win.$message.error("接口不存在");
        break;
      case 500:
      case 502:
        win.$message.error("网络异常");
        break;
      case 422: {
        const msg =
          response.data.errors[Object.keys(response.data.errors)[0]][0];
        win.$message.error(msg);
        // window.$message.error('邮箱已存在')
        break;
      }
    }
    // 报错的时候抛出一个报错信息
    return Promise.reject(error);
  }
);

// 抛出对象的信息
export default request;
