export default {
  baseUrl: {
    dev: "http://localhost:3001",
    // dev: "http://localhost:36742", // Mock Server
    prod: "http://domain.com"
  },
  publicPath: [/^\/public/, /^\/login/] // 针对公共路径，无需携带token
};
