import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { TrackCard, ArtistCard } from './GridCards';
import { useAppSelector } from '../../store/store';


export function GridItemComponent(props) {
  
  const { item, onClick } = props;

    if (item.playlist_id) {
      return <TrackCard item={item} onClick={onClick} />;
    }

    if (item.artist_id) {
      return <ArtistCard item={item} onClick={onClick} />;
    }

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
              <div key={String(item.playlist_id)} style={{ position: 'relative' }}>
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
