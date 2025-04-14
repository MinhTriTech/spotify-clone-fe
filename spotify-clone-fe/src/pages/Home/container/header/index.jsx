import React, { memo } from 'react';
import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';

// i18n
import { useTranslation } from 'react-i18next';

// Redux
import { homeActions } from '../../../../store/slices/home';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const SECTIONS = ['ALL', 'MUSIC', 'PODCASTS'];

const ChipsSection = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['home']);
  const section = useAppSelector((state) => state.home.section);

  return (
    <Space style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
      {SECTIONS.map((item) => (
        <Chip
          key={item}
          text={t(item)}
          active={section === item}
          onClick={() => dispatch(homeActions.setSection(item))}
        />
      ))}
    </Space>
  );
});

export const HomeHeader = ({ color, container, sectionContainer }) => {
  const user = useAppSelector((state) => state.auth.user);

  // if (!user) return null;

  return (
    <PageHeader
      color={color}
      activeHeider={20}
      container={container}
      sectionContainer={sectionContainer}
    >
      <ChipsSection />
    </PageHeader>
  );
};
