import React, { memo } from 'react';
import { Space } from 'antd';
import { FaSpotify } from 'react-icons/fa6';

import NavigationButton from './NavigationButton';
import ForwardBackwardsButton from './ForwardBackwardsButton';

const HistoryNavigation = memo(() => {
  return (
    <Space>
      <NavigationButton
        text="Mã nguồn"
        onClick={() => {
          window.open('https://github.com/francoborrelli/portfolio', '_blank');
        }}
        icon={<FaSpotify size={25} fill="white" />}
      />

      <div className="flex flex-row items-center gap-2 h-full">
        <ForwardBackwardsButton flip />
        <ForwardBackwardsButton flip={false} />
      </div>
    </Space>
  );
});

export default HistoryNavigation;
