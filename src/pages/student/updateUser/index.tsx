import * as React from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, message } from 'antd';
import { useModel } from 'umi';

import { updatePWD } from '@/services/student';

const UpdateUser: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = (values: any) => {
    updatePWD(initialState?.userID, values.password).then(() => {
      message.success('密码修改成功');
    });
  };

  return (
    <PageContainer>
      <div style={{ width: '400px' }}>
        <Form
          form={form}
          name="update_user"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="password"
            label="新密码"
            rules={[
              {
                required: true,
                message: '请输入你的密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认新密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认你的密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('您输入的两次密码不匹配！'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageContainer>
  );
};

export default UpdateUser;
