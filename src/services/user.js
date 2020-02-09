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
