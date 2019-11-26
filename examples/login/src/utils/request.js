/**
 * 封装axios请求，并对错误进行统一处理
 */
import axios from "axios";
import errorHandle from "./errorHandle";

const defaultConfig = {
  baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:3001" : "http://domain.com"
};

// 创建一个axios实例
const request = axios.create(defaultConfig);

// 响应拦截
request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const { data } = response;

      if (data.code === 0) {
        return Promise.resolve(response.data.data);
      }
    }

    return Promise.reject(response);
  },
  error => {
    debugger;
    errorHandle(error);

    return Promise.reject(error);
  }
);

export default request;
