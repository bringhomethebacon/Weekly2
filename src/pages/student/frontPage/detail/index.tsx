import * as React from 'react';

import { DetailTabs } from '@/components/DetailTabs';

interface DetailPageProps {
  rows: any[];
  visible: boolean;
  callback?: () => void;
  onClose: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({
  rows,
  visible,
  callback,
  onClose,
}) => {
  const items = [
    {
      label: '详情',
      key: 'details',
      children: <>{rows[0].content}</>,
    },
  ];
  return (
    <DetailTabs
      open={visible}
      panes={items}
      multiple={rows.length !== 1}
      onClose={onClose}
    />
  );
};

export default DetailPage;
