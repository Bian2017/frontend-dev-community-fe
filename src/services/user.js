import qs from "qs";
import request from "@/utils/request";

// 用户签到
export const createSign = () => {
  return request.get("/user/fav");
};

// 更新用户基本资料
export const updateUserInfo = data => request.post("/user/basic", data);

// 确认修改用户名(邮箱)
export const updateUsername = data => request.get(`/public/reset-email?${qs.stringify(data)}`);

// 设置收藏 & 取消收藏
export const addCollect = data => request.get(`/user/set-collect?${qs.stringify(data)}`);

// 获取收藏列表
export const getCollect = data => request.get(`/user/collect?${qs.stringify(data)}`);

// 获取发表的文章列表
export const getPostListByUid = data => request.get(`/user/post?${qs.stringify(data)}`);

// 删除指定的文章
export const deletePostByUid = data => request.get(`/user/delete-post?${qs.stringify(data)}`);
