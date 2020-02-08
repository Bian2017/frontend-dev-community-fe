import request from "@/utils/request";
import store from "@/store";

// 用户签到
// eslint-disable-next-line import/prefer-default-export
export const createSign = () => {
  const headers = {
    Authorization: `Bearer ${store.state.token}`,
    "Content-Type": "application/json"
  };

  return request.get("/user/fav", {
    headers
  });
};
