import React, { memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import TrackActionsWrapper from '../../../../components/Actions/TrackActions';

import { useAppSelector } from '../../../../store/store';
import tinycolor from 'tinycolor2';
import useIsMobile from '../../../../utils/isMobile';
import { getImageAnalysis2 } from '../../../../utils/imageAnyliser';
import { playerService } from '../../../../services/player';
import { EQUILISER_IMAGE } from '../../../../constants/spotify';

export const HorizontalCard = memo(({ item, setColor }) => {
  const currentSong = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track.id
  );
  const isPlaying = useAppSelector((state) => !state.spotify.state?.paused);
  const isCurrent = currentSong === item.id;

  const isMobile = useIsMobile();

  const onClick = useCallback(() => {
    if (isCurrent) return;
    playerService.startPlayback({ uris: [item.uri] });
  }, [isCurrent, item.uri]);

  useEffect(() => {
    if (item) getImageAnalysis2(item.album.images[0].url).then();
  }, [item]);

  const handleMouseEnter = () => {
    getImageAnalysis2(item.album.images[0].url).then((r) => {
      let color = tinycolor(r);
      while (color.isLight()) {
        color = color.darken(10);
      }
      setColor(color.toHexString());
    });
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
              <img height={20} alt={item.name} src={EQUILISER_IMAGE} />
            )}
            <PlayCircle size={15} isCurrent={isCurrent} context={{ uris: [item.uri] }} />
          </div>
        </div>
      </div>
    </TrackActionsWrapper>
  );
});
