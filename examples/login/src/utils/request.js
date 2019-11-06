import axios from 'axios'

const defaultConfig = {
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : 'http://domain.com'
}

// 创建一个axios实例
const request = axios.create(defaultConfig)

// 响应拦截
request.interceptors.response.use(
  response => {
    if (response.status !== 200) throw new Error(`请求状态码出错:${response.status}`)

    const { data } = response

    if (data.code === 0) {
      return data.data
    }

    return Promise.reject(data)
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
