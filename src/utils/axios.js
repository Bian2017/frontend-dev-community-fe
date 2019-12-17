/**
 * 封装axios请求，并对错误进行统一处理
 */
import axios from "axios";
import errorHandle from "./errorHandle";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.instance = null;
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
  interceptors() {
    // 响应拦截
    this.instance.interceptors.response.use(
      response => {
        // 历史背景：2G移动时代网关会将非200状态码的响应都拦截
        if (response.status === 200) {
          const { data } = response;

          if (data.code === 200) {
            return Promise.resolve(response.data.data);
          }
        }

        return Promise.reject(response);
      },
      error => {
        errorHandle(error);
        return Promise.reject(error);
      }
    );
  }

  // 创建实例
  request(options) {
    if (!this.instance) {
      this.instance = axios.create();
      this.interceptors();
    }
    const newOpts = Object.assign(this.getInsideConfig(), options);

    return this.instance(newOpts);
  }

  get(url, config) {
    return this.request({
      method: "get",
      url,
      ...config
    });
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
