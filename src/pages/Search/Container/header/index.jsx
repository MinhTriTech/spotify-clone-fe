import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';

// Redux
import { useAppSelector } from '../../../../store/store';
import { useNavigate, useParams } from 'react-router-dom';

const SECTIONS = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'ARTISTS', label: 'Nghệ sĩ' },
  { key: 'TRACKS', label: 'Bài hát' },
  { key: 'ALBUMS', label: 'Album' },
  { key: 'PLAYLISTS', label: 'Danh sách phát' },
];

export const SearchHeader = (props) => {
  const { container, sectionContainer, color } = props;

  const navigate = useNavigate();
  const params = useParams();
  const section = useAppSelector((state) => state.search.section);

  return (
    <PageHeader
      color={color}
      activeHeider={20}
      container={container}
      sectionContainer={sectionContainer}
    >
      <div>
        <Space size={10} style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
          {SECTIONS.map((item) => (
            <Chip
              key={item.key}
              text={item.label}
              active={section === item.key}
              onClick={() =>
                navigate(`/search/${params.search}/${item.key === 'ALL' ? '' : item.key.toLowerCase()}`)
              }
            />
          ))}
        </Space>
      </div>
    </PageHeader>
  );
};
