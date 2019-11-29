import HttpRequest from "./axios";
import config from "@/config";

const baseUrl = process.env.NODE_ENV !== "production" ? config.baseUrl.dev : config.baseUrl.prod;
const axios = new HttpRequest(baseUrl);

export default axios;
