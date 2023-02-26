import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Descriptions, Form, message } from 'antd';
import { useModel } from 'umi';

import RichEditor from '@/components/RichEditor';

import { createWeekly } from '@/services/student';

const Weekly: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = (values: any) => {
    createWeekly(initialState!.userID, values.richEditor, 1)
      .then(() => {
        message.success('提交成功');
      })
      .catch(() => {
        message.error('提交失败');
      });
  };

  return (
    <Form form={form} name="editor" onFinish={onFinish}>
      <PageContainer
        content={
          <Descriptions column={1} style={{ marginBlockEnd: -16 }}>
            <Descriptions.Item label="创建人">
              {initialState?.username}
            </Descriptions.Item>
          </Descriptions>
        }
        extra={[
          <Form.Item>
            <Button key="submit" type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>,
        ]}
      >
        <Form.Item name="richEditor">
          <RichEditor />
        </Form.Item>
      </PageContainer>
    </Form>
  );
};

export default Weekly;
