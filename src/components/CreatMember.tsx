import * as React from 'react';
import { Modal, Form, Input, message } from 'antd';

interface CreateMemberProps {
  open: boolean;
  onCancel: () => void;
}
const CreateMember: React.FC<CreateMemberProps> = ({ open, onCancel }) => {
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
            // createUser({
            //   studentid: values.student_id,
            //   username: values.name,
            // }).catch(() => {
            //   message.error("学号已存在");
            // });
            form.resetFields();
            onCancel();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={onCancel}
    >
      <Form form={form} name="form_in_modal">
        <Form.Item
          name="student_id"
          label="学号"
          rules={[
            {
              required: true,
              message: '请输入学号',
            },
          ]}
        >
          <Input placeholder="请输入学号" />
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

export default CreateMember;
