import * as React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Rate } from 'antd';
import { useModel } from 'umi';

import { getWeeklys, unCommit, getAllStudent } from '@/services/teacher';

interface HomePageTableProps {
  value: number;
  start_time: string;
  end_time: string;
}

const HomePageTable: React.FC<HomePageTableProps> = ({
  value,
  start_time,
  end_time,
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const columns: ProColumns<Record<string, any>>[] =
    value !== 0
      ? [
          {
            title: '姓名',
            dataIndex: 'StudentName',
          },
          {
            title: 'ID',
            dataIndex: 'StudentID',
            tooltip: 'id具有唯一性',
          },
          {
            title: '评分',
            dataIndex: 'Score',
            render: (text, record, index, action) => {
              return <Rate disabled value={record.Score} />;
            },
          },
        ]
      : [
          {
            title: '姓名',
            key: 'student_name',
            dataIndex: 'student_name',
          },
          {
            title: '学号',
            key: 'id',
            dataIndex: 'id',
          },
          {
            title: '评分',
            dataIndex: 'Score',
            render: (text, record, index, action) => {
              return <Rate disabled value={record.Score} />;
            },
          },
        ];

  if (value === 0) {
    return (
      <ProTable
        columns={columns}
        rowKey="StudentID"
        search={false}
        pagination={{
          pageSize: 10,
        }}
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
      />
    );
  }
  if (value === -1) {
    return (
      <ProTable
        columns={columns}
        rowKey="StudentID"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        request={(params: Record<string, any>) => {
          const { pageSize, current } = params;
          return unCommit(
            initialState?.userID,
            pageSize,
            current,
            start_time,
            end_time,
          );
        }}
      />
    );
  }

  return (
    <ProTable
      columns={columns}
      rowKey="StudentID"
      search={false}
      pagination={{
        pageSize: 10,
      }}
      request={(params: Record<string, any>) => {
        const { pageSize, current, status, student_name } = params;
        return getWeeklys(
          initialState?.userID,
          pageSize,
          current,
          value,
          student_name,
          start_time,
          end_time,
        );
      }}
    />
  );
};

export default HomePageTable;
