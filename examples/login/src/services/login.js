import request from "@/utils/request";

export const getCaptchaAsync = sid => request.get("/captcha", { params: { sid } });

export const forgetPasswordAsync = async params => request.post("/forget", params);

export default {};
