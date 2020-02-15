import qs from "qs";
import request from "@/utils/request";

// 获取文章中的评论列表
const getComments = params => request.get(`/public/comments?${qs.stringify(params)}`);

// 添加评论
const addComment = data => request.post(`/comments/reply`, data);

// 更新评论
const updateComment = data => request.post(`/comments/update`, data);

// 最佳答案采纳
const setCommentBest = params => request.get(`/comments/accept?${qs.stringify(params)}`);

export { getComments, addComment, updateComment, setCommentBest };
