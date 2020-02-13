import request from "@/utils/request";

// 获取文章中的评论列表
const getComments = tid => request.get(`/public/comments?tid=${tid}`);

// eslint-disable-next-line import/prefer-default-export
export { getComments };
