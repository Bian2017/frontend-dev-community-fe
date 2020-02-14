import qs from "qs";
import request from "@/utils/request";

// 获取文章中的评论列表
const getComments = params => request.get(`/public/comments?${qs.stringify(params)}`);

// 获取文章中的评论列表
const addComment = data => request.post(`/comments/reply`, data);

export { getComments, addComment };
