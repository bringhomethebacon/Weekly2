import * as React from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { useModel } from 'umi';

import { createTeacher } from '@/services/admin';

interface CreateTeacherProps {
  open: boolean;
  onCancel: () => void;
  onLoad?: any;
}
const CreateTeacher: React.FC<CreateTeacherProps> = ({
  open,
  onCancel,
  onLoad,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="添加成员"
      open={open}
      okText="创建"
      cancelText="取消"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            createTeacher(values.teacher_id, values.name)
              .catch(() => {
                message.error('教师编号已存在');
              })
              .finally(() => {
                onLoad();
              });
            form.resetFields();
            onCancel();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="form_in_modal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          name="teacher_id"
          label="教师编号"
          rules={[
            {
              required: true,
              message: '请输入教师编号',
            },
          ]}
        >
          <Input placeholder="请输入教师编号" />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入姓名',
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTeacher;
