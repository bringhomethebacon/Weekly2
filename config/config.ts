import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  hash: true,
  devServer: {
    port: 8000,
    host: '0.0.0.0',
  },
  antd: {
    // 配置开启antd组件库的使用
    dark: false,
  },
  layout: {
    // 开启项目视图骨架配置
    name: '周报管理系统',
    locale: true,
    // layout: 'side',
  },
  proxy,
  routes,
  mfsu: {},
  fastRefresh: {},
});
