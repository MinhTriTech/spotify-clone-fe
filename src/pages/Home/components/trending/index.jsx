import React, { memo } from 'react';
import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';

export const Trending = memo(() => {

  const trending = [
    {
      id: '1',
      type: 'playlist', 
      name: 'Hot Vibes',
      description: 'Most popular hits this week.',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' }
    },
    {
      id: '2',
      type: 'playlist',
      name: 'Viral Tracks',
      description: 'Songs blowing up on social media.',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' }
    }
  ];
  

  return (
    <div className="home">
      <GridItemList
        items={trending}
        title="Trending"
        moreUrl="/genre/trending"
        getDescription={getPlaylistDescription}
      />
    </div>
  );
});
