import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { AlbumCard, ArtistCard, PlaylistCard, TrackCard } from './GridCards';

// ❌ Đã xoá useTranslation

// Redux
import { useAppSelector } from '../../store/store';

export function GridItemComponent(props) {
  const { item, getDescription, onClick } = props;

  if (item.type === 'track') {
    return <TrackCard item={item} onClick={onClick} />;
  }

  if (item.type === 'album') {
    return <AlbumCard item={item} onClick={onClick} getDescription={getDescription} />;
  }

  if (item.type === 'playlist') {
    return <PlaylistCard item={item} onClick={onClick} getDescription={getDescription} />;
  }

  if (item.type === 'artist') {
    return <ArtistCard item={item} onClick={onClick} getDescription={getDescription} />;
  }

  return null;
}

export const DeleteButton = (props) => {
  return (
    <div style={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}>
      <button
        className='item-delete-button'
        aria-label='Xoá'
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
      >
        <svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 16 16'>
          <path d='M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z'></path>
        </svg>
      </button>
    </div>
  );
};

export function GridItemList(props) {
  const user = useAppSelector((state) => !!state.auth.user);
  const { onItemDelete, onItemClick, getDescription } = props;
  const { items, chips, title, moreUrl, extra, subtitle } = props;

  return (
    <div className={`${!user ? 'guest' : ''}`}>
      <Flex justify='space-between' align='center'>
        <div>
          {title ? (
            moreUrl ? (
              <Link to={moreUrl} style={{ textDecoration: 'none' }}>
                <h1 className='playlist-header'>{title}</h1>
              </Link>
            ) : (
              <h1 className='playlist-header'>{title}</h1>
            )
          ) : null}

          {subtitle ? <h2 className='playlist-subheader'>{subtitle}</h2> : null}
        </div>

        {extra ? (
          extra
        ) : moreUrl ? (
          <Link to={moreUrl}>
            <button className='showMore'>
              <span>Xem thêm</span>
            </button>
          </Link>
        ) : null}
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
              <div key={item.uri} style={{ position: 'relative' }}>
                {onItemDelete ? <DeleteButton onClick={() => onItemDelete(item)} /> : null}
                <GridItemComponent
                  item={item}
                  getDescription={getDescription}
                  onClick={onItemClick ? () => onItemClick(item) : undefined}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
