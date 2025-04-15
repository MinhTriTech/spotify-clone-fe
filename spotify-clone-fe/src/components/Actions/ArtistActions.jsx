import { memo, useMemo } from 'react';
import { Dropdown } from 'antd';
import { FollowIcon, UnfollowIcon } from '../Icons';

const ArtistActionsWrapper = memo(({ children, artist, trigger = ['contextMenu'] }) => {
  // 👤 Giả lập trạng thái follow (có thể random cho mỗi artist)
  const isFollowing = artist?.name?.toLowerCase().includes('a'); // random mock rule

  const items = useMemo(() => {
    const id = artist.id || artist.uri?.split(':').reverse()[0];

    return [
      {
        key: isFollowing ? 'unfollow' : 'follow',
        label: isFollowing ? 'Unfollow' : 'Follow',
        icon: isFollowing ? <UnfollowIcon /> : <FollowIcon />,
        onClick: () => {
          console.log(
            isFollowing
              ? `Mock: unfollow artist ${id}`
              : `Mock: follow artist ${id}`
          );
        },
      },
    ];
  }, [artist, isFollowing]);

  return (
    <Dropdown menu={{ items }} trigger={trigger}>
      {children}
    </Dropdown>
  );
});

export default ArtistActionsWrapper;
