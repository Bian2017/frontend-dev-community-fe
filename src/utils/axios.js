/**
 * 封装axios请求，并对错误进行统一处理
 */
import axios from "axios";
import errorHandle from "./errorHandle";
import store from "@/store";
import publicConfig from "@/config";

const { CancelToken } = axios; // 用于取消网络请求

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.instance = null;
    this.pending = {}; // 存储用户的历史请求，用于减少用户操作导致的重复请求
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

  removePending(key, isRequest = false) {
    // 条件为true，说明对应URL已经发起请求，则需取消上一次请求，执行cancel方法
    if (this.pending[key] && isRequest) {
      // 执行cancel方法(message参数可选)
      this.pending[key]("取消重复请求");
    }

    delete this.pending[key];
  }

  // 设定拦截器
  interceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      config => {
        let isPublic = false;

        publicConfig.publicPath.map(path => {
          isPublic = isPublic || path.test(config.url);

          return path;
        });

        const { token } = store.state;
        if (!isPublic && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const key = `${config.url}&${config.method}`;

        this.removePending(key, true);

        config.cancelToken = new CancelToken(cancelFunc => {
          this.pending[key] = cancelFunc;
        });

        return config;
      },
      err => {
        errorHandle(err);
        return Promise.reject(err);
      }
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      response => {
        const key = `${response.config.url}&${response.config.method}`;
        // 如果后台已经响应了这次请求，则需删除这个请求：1) 防止内存溢出； 2) 防止正常请求被拦截到
        this.removePending(key);

        // 历史背景：2G移动时代网关会将非200状态码的响应都拦截
        if (response.status === 200) {
          const { data } = response;

          if (`${data.code}` === `200`) {
            return Promise.resolve(data);
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
