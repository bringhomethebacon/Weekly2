import * as React from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { useModel } from 'umi';

import { creaetStudent } from '@/services/teacher';

interface CreateMemberProps {
  open: boolean;
  onCancel: () => void;
  onLoad?: any;
}
const CreateMember: React.FC<CreateMemberProps> = ({
  open,
  onCancel,
  onLoad,
}) => {
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');

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
            creaetStudent(
              initialState?.userID,
              values.student_id,
              values.name,
              values?.phone,
              values?.grade,
              values?.category,
              values?.specialized,
              values?.research_direction,
              values?.gender,
              values?.native_place,
            )
              .catch(() => {
                message.error('学号已存在');
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
        <Form.Item name="phone" label="联系方式">
          <Input placeholder="请输入联系方式" />
        </Form.Item>
        <Form.Item name="grade" label="年级">
          <Input placeholder="请输入年级" />
        </Form.Item>
        <Form.Item name="category" label="类别">
          <Input placeholder="请输入类别" />
        </Form.Item>
        <Form.Item name="specialized" label="专业">
          <Input placeholder="请输入专业" />
        </Form.Item>
        <Form.Item name="research_direction" label="研究方向">
          <Input placeholder="请输入研究方向" />
        </Form.Item>
        <Form.Item name="gender" label="性别">
          <Select placeholder="请输入研究方向">
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="native_place" label="籍贯">
          <Input placeholder="请输入专业" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMember;
