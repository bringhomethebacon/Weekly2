import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { StatisticProps } from '@ant-design/pro-components';
import { ProCard, StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const items = [
  { key: '1', title: '全部', value: 10, total: true },
  { key: '2', status: 'default', title: '未提交', value: 5 },
  { key: '3', status: 'processing', title: '已提交', value: 3 },
  { key: '4', status: 'success', title: '已评论', value: 1 },
];

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          onChange: (key) => {
            console.log('key', key);
          },
          items: items.map((item) => {
            return {
              key: item.key,
              style: { width: '100%' },
              label: (
                <Statistic
                  layout="vertical"
                  title={item.title}
                  value={item.value}
                  status={item.status as StatisticProps['status']}
                  style={{
                    width: 240,
                    borderInlineEnd: item.total
                      ? '1px solid #f0f0f0'
                      : undefined,
                  }}
                />
              ),
              children: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                    height: 500,
                  }}
                >
                  关联展示内容 {item.title}
                </div>
              ),
            };
          }),
        }}
      />
    </PageContainer>
  );
};
export default HomePage;
