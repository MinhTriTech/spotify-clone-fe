import React, { memo, useState } from 'react';
import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';

// i18n
import { useTranslation } from 'react-i18next';

const SECTIONS = ['ALL', 'MUSIC', 'PODCASTS'];

const ChipsSection = memo(({ section, setSection }) => {
  const [t] = useTranslation(['home']);

  return (
    <Space style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
      {SECTIONS.map((item) => (
        <Chip
          key={item}
          text={t(item)}
          active={section === item}
          onClick={() => setSection(item)}
        />
      ))}
    </Space>
  );
});

export const HomeHeader = ({ color, container, sectionContainer }) => {
  const [section, setSection] = useState('ALL'); // ✅ mock trạng thái lọc
  const user = true; // ✅ giả lập có user

  // if (!user) return null;

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
