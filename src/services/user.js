import request from "@/utils/request";
import store from "@/store";

const headers = {
  Authorization: `Bearer ${store.state.token}`,
  "Content-Type": "application/json"
};

// 用户签到
// eslint-disable-next-line import/prefer-default-export
export const createSign = () =>
  request.get("/user/fav", {
    headers
  });
