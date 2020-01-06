module.exports = {
  root: true,
  env: {
    node: true
  },
  /**
   * 关闭所有不必要或可能与Prettier冲突的规则。这使您可以使用自己喜欢的可共享配置，而不会让其风格选择妨碍使用Prettier。
   *
   * 注意:
   * - 要确保将其置于最后，否则会覆盖其他配置。
   */
  extends: ["plugin:vue/essential", "@vue/airbnb", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/no-unresolved": [
      2,
      {
        ignore: ["^@/"] // 解决eslint不能识别webpack的路径别名
      }
    ],
    "class-methods-use-this": 0,
    "no-param-reassign": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
