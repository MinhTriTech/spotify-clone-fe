import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import TrackActionsWrapper from '../../../../components/Actions/TrackActions';

import tinycolor from 'tinycolor2';
import useIsMobile from '../../../../utils/isMobile';

export const HorizontalCard = memo(({ item, setColor }) => {
  const isMobile = useIsMobile();

  // MOCK: giả định không cần kiểm tra bài hát đang phát
  const isCurrent = false;
  const isPlaying = false;

  // MOCK player service
  const onClick = useCallback(() => {
    console.log('Mock play:', item.uri);
  }, [item.uri]);

  // MOCK màu ảnh
  const handleMouseEnter = () => {
    const randomColor = tinycolor.random().darken(10).toHexString();
    setColor?.(randomColor);
  };

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div
        className="horizontal-playlist"
        onClick={isMobile ? onClick : undefined}
        onDoubleClick={isMobile ? undefined : onClick}
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      >
        <div style={{ display: 'flex' }}>
          <div className="img-container">
            <div className="img-section">
              <img src={item.album.images[0].url} alt={item.name} />
            </div>
          </div>
        </div>

        <div className="text-container">
          <div className="text-section">
            <div>
              {isMobile ? (
                <p>{item.name}</p>
              ) : (
                <Link title={item.name} to={`/album/${item.album.id}`}>
                  <p>{item.name}</p>
                </Link>
              )}
            </div>
          </div>

          <div className="button-container">
            {isCurrent && isPlaying && (
              <img height={20} alt={item.name} src="/mock/equaliser.gif" />
            )}
            <PlayCircle size={15} isCurrent={isCurrent} context={{ uris: [item.uri] }} />
          </div>
        </div>
      </div>
    </TrackActionsWrapper>
  );
});
