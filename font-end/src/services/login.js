import request from "@/utils/request";

/**
 * 获取验证码接口
 *
 * @param {stirng} sid 唯一标识
 */
export const getCaptchaAsync = sid => request.get("/public/captcha", { params: { sid } });

/**
 * 密码找回接口
 *
 * @param {object} params 用户信息(邮箱、验证码)
 */
export const forgetPasswordAsync = async params => request.post("/forget", params);

/**
 * 登录接口
 *
 * @param {object} loginInfo 用户登录信息(邮箱、密码、验证码、UUID)
 */
export const loginAsync = async loginInfo => request.post("/login/login", { ...loginInfo });

export default {};
