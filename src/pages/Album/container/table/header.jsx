import { memo } from 'react';

import TableHeader, { TableHeaderComponents } from '../../../../components/SongsTable/header';

import { useAppSelector } from '../../../../store/store';

export const AlbumTableHeader = memo(() => {
  const view = useAppSelector((state) => state.album.view);

  return (
    <TableHeader
      view={view}
      fields={[
        TableHeaderComponents.Index,
        TableHeaderComponents.Title,
        TableHeaderComponents.Artists,
        TableHeaderComponents.Space,
      ]}
    />
  );
});
