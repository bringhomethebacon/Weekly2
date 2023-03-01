import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import RcResizeObserver from 'rc-resize-observer';
import ProTable from '@ant-design/pro-table';
import { Rate } from 'antd';
import { DrawerForm, ProCard } from '@ant-design/pro-components';
import { useModel } from 'umi';

import { getWeekly } from '@/services/student';

const FrontPage: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [selectedRows, setSelectedRows] = React.useState<API.Weekly>();
  const [responsive, setResponsive] = React.useState<boolean>(false);

  const openDetail = React.useCallback((rows: API.Weekly) => {
    setSelectedRows(rows);
    setOpen(true);
  }, []);

  const closeDetail = React.useCallback(() => {
    setOpen(false);
  }, []);

  const columns: ProColumns<API.Weekly>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: true,
      render: (text, record, index, action) => (
        <a
          onClick={() => {
            openDetail(record);
          }}
        >
          {initialState?.username}
        </a>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'student_id',
      tooltip: 'id具有唯一性',
      hideInSearch: true,
    },
    {
      title: '提交日期',
      dataIndex: 'create_at',
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '提交日期',
      dataIndex: 'create_at',
      hideInTable: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => {
          return {
            startTime: value?.[0],
            endTime: value?.[1],
          };
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '已提交',
          status: 'Default',
        },
        2: {
          text: '已评论',
          status: 'Success',
        },
      },
    },
    {
      title: '评分',
      dataIndex: 'score',
      hideInSearch: true,
      render: (text, record, index, action) => {
        return <Rate disabled value={record.score} />;
      },
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable<API.Weekly, API.PageParams>
          rowKey="id"
          columns={columns}
          request={(params: Record<string, any>) => {
            const { current, pageSize, startTime, endTime } = params;
            return getWeekly(
              initialState?.userID,
              pageSize,
              current,
              startTime,
              endTime,
            );
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 10,
          }}
        />
        <DrawerForm
          onOpenChange={setOpen}
          title="周报"
          width={window.screen.availWidth * 0.7}
          open={open}
          onFinish={() => {
            closeDetail();
            return Promise.resolve();
          }}
        >
          {open && (
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <ProCard
                extra="2019年9月28日"
                split={responsive ? 'horizontal' : 'vertical'}
                bordered
                headerBordered
              >
                <ProCard title="周报" colSpan="50%">
                  <div
                    style={{ height: 360 }}
                    dangerouslySetInnerHTML={{
                      __html: selectedRows?.content || '',
                    }}
                  ></div>
                </ProCard>
                <ProCard title="评论">
                  <div
                    style={{ height: 360 }}
                    dangerouslySetInnerHTML={{
                      __html: selectedRows?.review || '',
                    }}
                  ></div>
                </ProCard>
              </ProCard>
            </RcResizeObserver>
          )}
        </DrawerForm>
      </PageContainer>
    </>
  );
};

export default FrontPage;
