import qs from "qs";
import request from "@/utils/request";

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

export { getList, getTop, getTips, getLinks, uploadImg, addPost };
