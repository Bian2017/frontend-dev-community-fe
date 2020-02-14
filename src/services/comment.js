import request from "@/utils/request";

// 获取文章中的评论列表
const getComments = tid => request.get(`/public/comments?tid=${tid}`);

// 获取文章中的评论列表
const addComment = data => request.post(`/comments/reply`, data);

export { getComments, addComment };
