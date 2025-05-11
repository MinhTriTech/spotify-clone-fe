import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { TrackCard, ArtistCard, AlbumCard } from './GridCards';
import { useAppSelector } from '../../store/store';

export function GridItemComponent(props) {
  
  const { item, onClick } = props;
  
    if (item.playlist_id && !item.album_id) {
      return <TrackCard item={item} onClick={onClick} />;
    }

    if (item.artist_id && !item.album_id) {
      return <ArtistCard item={item} onClick={onClick} />;
    }

    if (item.album_id && item.artist_id) {
      return <AlbumCard item={item} onClick={onClick} />;
    }

    if (item.id && item.username) {
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
            if (item.album_id) {
              return (
                <div key={String(item.album_id)} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            } else if (item.artist_id) {
              return (
                <div key={String(item.artist_id)} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            } else if (item.id && item.username) {
              return (
                <div key={String(item.id)} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            }
            else {
              return (
                <div key={String(item.playlist_id)} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            }
          })} 
      </div>
    </div>
  );
}
