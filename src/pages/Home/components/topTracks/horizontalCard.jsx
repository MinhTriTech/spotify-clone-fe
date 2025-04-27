import { memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import TrackActionsWrapper from '../../../../components/Actions/TrackActions';

// Utils
import tinycolor from 'tinycolor2';
import useIsMobile from '../../../../utils/isMobile';
import { getImageAnalysis2 } from '../../../../utils/imageAnyliser';

// Contexts
import { useAudio } from '../../../../contexts/AudioContext';

// Constants
import { EQUILISER_IMAGE } from '../../../../constants/spotify';

export const HorizontalCard = memo(({ item, setColor }) => {
  const isMobile = useIsMobile();
  const { currentSrc, isPlaying } = useAudio(); 

  const isCurrent = currentSrc.includes(item.file_path);

  const onClick = useCallback(() => {
    console.log(item); 
  }, [item]);

  useEffect(() => {
    if (item) {
      getImageAnalysis2(item.image).then();
    }
  }, [item]);

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div
        className="horizontal-playlist"
        onClick={isMobile ? onClick : undefined}
        onDoubleClick={isMobile ? undefined : onClick}
        onMouseEnter={
          !isMobile
            ? () => {
                getImageAnalysis2(item.image).then((r) => {
                  let color = tinycolor(r);
                  while (color.isLight()) {
                    color = color.darken(10);
                  }
                  setColor(color.toHexString());
                });
              }
            : undefined
        }
      >
        <div style={{ display: 'flex' }}>
          <div className="img-container">
            <div className="img-section">
              <img
                src={item.image}
                alt={item.title}
              />
            </div>
          </div>
        </div>

        <div className="text-container">
          <div className="text-section">
            <div>
              {isMobile ? (
                <p>{item.title}</p>
              ) : (
                <Link title={item.title}>
                  <p>{item.title}</p>
                </Link>
              )}
            </div>
          </div>

          <div className="button-container">
            {isCurrent && isPlaying ? (
              <img height={20} alt={item.title} src={EQUILISER_IMAGE} />
            ) : null}
            <PlayCircle size={15} isCurrent={isCurrent} context={item} />
          </div>
        </div>
      </div>
    </TrackActionsWrapper>
  );
});
