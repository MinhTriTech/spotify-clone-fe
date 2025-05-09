import { Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Chip from '../../../../components/Chip';
import { PageHeader } from '../../../../components/Layout/components/Header';
import { useAppSelector } from '../../../../store/store';

const SECTIONS = ['ALL', 'ARTISTS', 'TRACKS', 'ALBUMS', 'PLAYLISTS'];

const sectionLabels = {
  ALL: 'TẤT CẢ',
  ARTISTS: 'NGHỆ SĨ',
  TRACKS: 'BÀI HÁT',
  ALBUMS: 'ALBUM',
  PLAYLISTS: 'DANH SÁCH PHÁT',
};

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
              key={item}
              text={sectionLabels[item]} 
              active={section === item}
              onClick={() =>
                navigate(`/search/${params.search}/${item === 'ALL' ? '' : item.toLowerCase()}`)
              }
            />
          ))}
        </Space>
      </div>
    </PageHeader>
  );
};
