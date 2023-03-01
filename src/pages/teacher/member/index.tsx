import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { RecordKey } from '@ant-design/pro-utils/es/useEditableArray';
import { Button, message } from 'antd';
import { useModel } from 'umi';
import { getAllStudent } from '@/services/teacher';

import CreateMember from '@/components/CreatMember';

import { updateStudent, deleteStudent } from '@/services/teacher';

const Member: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const ref = React.useRef<any>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ProColumns<Record<string, any>>[] = [
    {
      title: '姓名',
      key: 'student_name',
      dataIndex: 'student_name',
      editable: false,
    },
    {
      title: '学号',
      key: 'id',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: '联系方式',
      key: 'phone',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '年级',
      key: 'grade',
      dataIndex: 'grade',
      hideInSearch: true,
    },
    {
      title: '类别',
      key: 'category',
      dataIndex: 'category',
      hideInSearch: true,
    },
    {
      title: '专业',
      key: 'specialized',
      dataIndex: 'specialized',
      hideInSearch: true,
    },
    {
      title: '研究方向',
      key: 'research_direction',
      dataIndex: 'research_direction',
      hideInSearch: true,
    },
    {
      title: '性别',
      key: 'gender',
      dataIndex: 'gender',
      hideInSearch: true,
    },
    {
      title: '籍贯',
      key: 'native_place',
      dataIndex: 'native_place',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable<Record<string, any>, API.PageParams>
          actionRef={ref}
          rowKey="id"
          editable={{
            onSave: (key: RecordKey, row: Record<string, any>) => {
              return updateStudent(
                initialState?.userID,
                row.id,
                row?.phone,
                row?.grade,
                row?.category,
                row?.specialized,
                row?.research_direction,
                row?.gender,
                row?.native_place,
              ).finally(() => {
                ref.current.reload();
              });
            },
            onDelete: (key: RecordKey, row: Record<string, any>) => {
              return deleteStudent(row.id)
                .then(() => {
                  message.success('删除成功');
                })
                .finally(() => {
                  ref.current.reload();
                });
            },
          }}
          columns={columns}
          request={(params: Record<string, any>) => {
            const { current, pageSize, student_name, id } = params;
            return getAllStudent(
              initialState?.userID,
              pageSize,
              current,
              student_name,
              id,
            );
          }}
          pagination={{
            pageSize: 10,
          }}
          toolBarRender={() => [
            <Button type="primary" key="create" onClick={showModal}>
              添加用户
            </Button>,
          ]}
        />
        <CreateMember
          open={isModalOpen}
          onCancel={() => handleCancel()}
          onLoad={() => ref.current.reload()}
        />
      </PageContainer>
    </>
  );
};

export default Member;
