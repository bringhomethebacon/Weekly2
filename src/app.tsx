import HeaderDropdown from './components/HeaderDropdown';

// 在这个文件中做项目的运行时配置
import { history, RequestConfig } from 'umi';

// 异步请求相关运行时配置
export const request: RequestConfig = {
  // 请求拦截
  requestInterceptors: [
    (url: string, options: RequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        return {
          url: `${url}`,
          options: {
            ...options,
            // interceptors: true,
            url: 'http://127.0.0.1:5335' + url,
            headers: { Authorization: token },
          },
        };
      }
      return { url: `${url}`, options }; // 此处return的内容就是自定义请求配置
    },
  ],
  responseInterceptors: [
    // 响应拦截器
    (response: Response, options: RequestConfig) => {
      return response; // 此处return的内容时后端下发的数据包
    },
  ],
};

// 初始化某些全局数据的运行时配置
export async function getInitialState() {
  let userState: Record<string, any> = {
    isLogin: false,
    userID: null,
    username: null,
    role: null,
  };
  return userState;
}

// layout的运行时配置， 自定义控制Layout的渲染逻辑
export const layout = ({
  initialState,
}: {
  initialState: Record<string, any>;
}) => {
  return {
    rightRender: () => {
      return <HeaderDropdown />;
    },
    onPageChange: () => {
      // 此处可以根据用户的登录状态， 引导用户进行指定的路由访问
      let { isLogin } = initialState;
      if (!isLogin) {
        history.push('/login');
      }
    },
  };
};
