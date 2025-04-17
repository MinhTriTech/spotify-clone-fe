import React, { memo, useState } from 'react';
import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';

const SECTIONS = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'MUSIC', label: 'Nhạc' },
  { key: 'PODCASTS', label: 'Podcast' },
];

const ChipsSection = memo(({ section, setSection }) => {
  return (
    <Space style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
      {SECTIONS.map((item) => (
        <Chip
          key={item.key}
          text={item.label}
          active={section === item.key}
          onClick={() => setSection(item.key)}
        />
      ))}
    </Space>
  );
});

export const HomeHeader = ({ color, container, sectionContainer }) => {
  const [section, setSection] = useState('ALL'); // ✅ mock trạng thái lọc
  const user = true; // ✅ giả lập có user

  return (
    <PageHeader
      color={color}
      activeHeider={20}
      container={container}
      sectionContainer={sectionContainer}
    >
      <ChipsSection section={section} setSection={setSection} />
    </PageHeader>
  );
};
