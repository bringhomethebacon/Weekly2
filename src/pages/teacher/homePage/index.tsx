import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { StatisticProps } from '@ant-design/pro-components';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useModel } from 'umi';
import moment from 'moment';

import HomePageTable from '@/components/HomePageTable';
import { getNumbers } from '@/services/teacher';

const { Statistic } = StatisticCard;

const HomePage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [keyValue, setKeyValue] = React.useState<number>(0);
  const [commitNum, setCommitNum] = React.useState<Number>(0); // 已提交人数
  const [review, setReview] = React.useState<Number>(0); // 已评论人数
  const [total, setCTotal] = React.useState<Number>(0); // 总人数
  const [unCommit, setUnCommit] = React.useState<Number>(0); // 未提交人数

  const weekOfday = moment().format('E');
  const monday = React.useMemo(() => {
    return moment()
      .subtract(Number(weekOfday) - 1, 'days')
      .format('YYYY-MM-DD 00:00:00');
  }, []);

  const sunday = React.useMemo(() => {
    return moment()
      .add(7 - Number(weekOfday), 'days')
      .format('YYYY-MM-DD 23:59:59');
  }, []);

  React.useEffect(() => {
    getNumbers(initialState?.userID, monday, sunday).then((res) => {
      setCommitNum(res.commitNum);
      setReview(res.review);
      setCTotal(res.total);
      setUnCommit(res.uncommit);
    });
  }, []);

  const items = React.useMemo(() => {
    return [
      {
        key: '0',
        title: '全部',
        value: total,
        children: (
          <HomePageTable value={0} start_time={monday} end_time={sunday} />
        ),
      },
      {
        key: '-1',
        status: 'default',
        title: '未提交',
        value: unCommit,
        children: (
          <HomePageTable value={-1} start_time={monday} end_time={sunday} />
        ),
      },
      {
        key: '1',
        status: 'processing',
        title: '已提交',
        value: commitNum,
        children: (
          <HomePageTable value={1} start_time={monday} end_time={sunday} />
        ),
      },
      {
        key: '2',
        status: 'success',
        title: '已评论',
        value: review,
        children: (
          <HomePageTable value={2} start_time={monday} end_time={sunday} />
        ),
      },
    ];
  }, [keyValue, total, commitNum, review, unCommit]);

  return (
    <PageContainer>
      <ProCard
        tabs={{
          onChange: (key) => {
            setKeyValue(Number(key));
          },
          items: items.map((item) => {
            return {
              key: item.key,
              style: { width: '100%' },
              label: (
                <Statistic
                  layout="vertical"
                  title={item.title}
                  value={item.value as any}
                  status={item.status as StatisticProps['status']}
                  style={{
                    width: 240,
                    borderInlineEnd: '1px solid #f0f0f0',
                  }}
                />
              ),
              children: item.children,
            };
          }),
        }}
      />
    </PageContainer>
  );
};
export default HomePage;
