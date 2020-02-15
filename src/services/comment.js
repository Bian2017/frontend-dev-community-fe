import qs from "qs";
import request from "@/utils/request";
import store from "@/store";

// 获取文章中的评论列表
const getComments = params => {
  const { token } = store.state;
  let headers = {};
  if (token !== "") {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  return request.get(`/public/comments?${qs.stringify(params)}`, headers);
};

// 添加评论
const addComment = data => request.post(`/comments/reply`, data);

// 更新评论
const updateComment = data => request.post(`/comments/update`, data);

// 最佳答案采纳
const setCommentBest = params => request.get(`/comments/accept?${qs.stringify(params)}`);

// 设置点赞
const setHands = params => request.get(`/comments/hands?${qs.stringify(params)}`);

export { getComments, addComment, updateComment, setCommentBest, setHands };
