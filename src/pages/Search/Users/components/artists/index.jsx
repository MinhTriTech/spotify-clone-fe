import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppSelector } from '../../../../../store/store';

const UsersSearchSection = memo(() => {
  const users = useAppSelector((state) => state.search.users);

  if (!users || !users.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={users}
        />
      </div>
    </div>
  );
});

export default UsersSearchSection;
