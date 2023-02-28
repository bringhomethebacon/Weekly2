export default {
  '/api': {
    // 要代理的真实服务器地址
    target: 'http://182.92.86.194',
    // 配置了这个可以从http 代理到https
    // https: true,
    // 依赖origin 的功能可能需要这个，比如cookie
    changeOrigin: true,
    patchRewrite: { '^/api': '' }, // 路径替换
  },
};
