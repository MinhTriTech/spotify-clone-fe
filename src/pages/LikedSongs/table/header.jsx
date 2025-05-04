import TableHeader, { TableHeaderComponents } from '../../../components/SongsTable/header';

import { useAppSelector } from '../../../store/store';

export const PlaylistTableHeader = () => {
  const view = useAppSelector((state) => state.playlist.view);

  return (
    <TableHeader
      view={view}
      fields={[
        TableHeaderComponents.Index,
        TableHeaderComponents.Title,
        TableHeaderComponents.Space,
        TableHeaderComponents.Artists,
        TableHeaderComponents.Space,
      ]}
    />
  );
};
