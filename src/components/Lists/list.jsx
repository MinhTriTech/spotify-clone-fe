import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import {  TrackCard } from './GridCards';
import { useAppSelector } from '../../store/store';

const mockArtist = {
  uri: 'spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ',
  id: '1Xyo4u8uXC1ZmMpatF05PJ',
  type: 'artist',
  name: 'The Weeknd',
  images: [
    { url: 'https://via.placeholder.com/300' },
  ],
};

export const mockTrack = {
  uri: 'spotify:track:7szuecWAPwGoV1e5vGu8tl',
  id: '7szuecWAPwGoV1e5vGu8tl',
  type: 'track',
  name: 'Blinding Lights',
  album: {
    id: '4yP0hdKOZPNshxUOjY0cZj',
    name: 'After Hours',
    images: [
      { url: 'https://via.placeholder.com/300' },
    ],
  },
  artists: [
    { name: 'The Weeknd' },
  ],
};


export function GridItemComponent(props) {
  const { item, onClick } = props;

    return <TrackCard item={item} onClick={onClick} />;

  // if (item.type === 'artist') {
    // return <ArtistCard item={mockArtist} onClick={onClick} getDescription={getDescription} />;
  // }

  return null;
}

export function GridItemList(props) {
  const user = useAppSelector((state) => !!state.auth.user);
  const { onItemClick } = props;
  const { items, chips, title } = props;

  return (
    <div className={`${!user ? 'guest' : ''}`}>
      <Flex justify='space-between' align='center'>
        <div>
          {title ? (
              <Link style={{ textDecoration: 'underline' }}>
                <h1 className='playlist-header'>{title}</h1>
              </Link>
          ) : null}
        </div>

        <Link>
          <button className='showMore'>
            <span>Xem thêm</span>
          </button>
        </Link>
      </Flex>

      {chips}
      <div
        className='playlist-grid'
        style={
          props.multipleRows
            ? {
                gridTemplateRows: 'unset',
              }
            : undefined
        }
      >
        {(items || [])
          .filter((i) => i)
          .map((item) => {
            return (
              <div key={item.playlist_id} style={{ position: 'relative' }}>
                <GridItemComponent
                  item={item}
                  onClick={onItemClick ? () => onItemClick(item) : undefined}
                />
              </div>
            );
          })} 
      </div>
    </div>
  );
}
