/**
 * 封装axios请求，并对错误进行统一处理
 */
import axios from "axios";
import errorHandle from "./errorHandle";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["interceptors"] }] */
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // 获取内部配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      timeout: 10000
    };

    return config;
  }

  // 设定拦截器
  interceptors(instance) {
    // 响应拦截
    instance.interceptors.response.use(
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
  }

  // 创建实例
  request(options) {
    const instance = axios.create();
    const newOpts = Object.assign(this.getInsideConfig(), options);

    this.interceptors(instance);
    return instance(newOpts);
  }

  get(url, config) {
    const options = {
      method: "get",
      url,
      ...config
    };

    return this.request(options);
  }

  post(url, data) {
    return this.request({
      method: "post",
      url,
      data
    });
  }
}

export default HttpRequest;
