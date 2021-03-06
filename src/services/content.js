import qs from "qs";
import request from "@/utils/request";
import store from "@/store";

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = options => {
  return request.get(`/public/list?${qs.stringify(options)}`);
};

// 本周热议
const getTop = () => {
  return request.get("/public/topWeek");
};

// 温馨提醒
const getTips = () => {
  return request.get("/public/tips");
};

// 友情链接
const getLinks = () => {
  return request.get("/public/links");
};

// 图片上传接口
const uploadImg = formData => request.post("/content/upload", formData);

// 发帖接口
const addPost = data => request.post("/content/add", { ...data });

// 获取文章详情
const getDetail = tid => {
  const { token } = store.state;
  let headers = {};
  if (token !== "") {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  return request.get(`/public/content/detail?tid=${tid}`, headers);
};

// 更新帖子
const updatePost = data => request.post(`/content/update`, data);

export { getList, getTop, getTips, getLinks, uploadImg, addPost, getDetail, updatePost };
