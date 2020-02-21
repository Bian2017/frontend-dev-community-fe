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

// 获取用户的基本信息
export const getInfo = data => request.get(`/public/info?${qs.stringify(data)}`);

// 获取用户最近文章列表
export const getPostPublic = data => request.get(`/public/latest-post?${qs.stringify(data)}`);

// 获取用户最近评论列表
export const getCommentList = data => request.get(`/public/latest-comment?${qs.stringify(data)}`);

// 获取用户未读消息
export const getMsg = data => request.get(`/user/getmsg?${qs.stringify(data)}`);
