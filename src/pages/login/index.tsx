import * as React from 'react';

import { Button, Form, Input, message, Select, Radio } from 'antd';
import { useHistory } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
// import { response } from 'express';

import { login } from '@/services/login';

import './index.less';

const Login = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const history = useHistory();

  const onFinish = (
    values: Record<'username' | 'password' | 'role', string>,
  ) => {
    // 修改全局的initialState, 让layout有机会进入主面板
    login(values.username, values.password, values.role)
      .then((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.username);
        // localStorage.setItem('studentid', res.studentid);
        setInitialState({
          isLogin: true,
          userID: res.userID,
          username: res.username,
          role: res.role,
        });
        // 触发路由切换
        if (res.role === 'student') {
          setTimeout(() => {
            history.push('/student/frontPage');
          }, 500);
        }
        if (res.role === 'teacher') {
          setTimeout(() => {
            history.push('/teacher/homePage');
          }, 500);
        }
        if (res.role === 'root') {
          setTimeout(() => {
            history.push('/admin');
          }, 500);
        }
      })
      .catch(() => {
        message.error('登录失败');
      });
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title">周报管理系统</div>
        <Form className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="用户类型"
            name="role"
            wrapperCol={{ offset: 4 }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio value="student">学生</Radio>
              <Radio value="teacher">教师</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
