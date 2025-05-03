import { memo } from 'react';
import { Clock } from '../Icons';

const Index = (props) => {
  return (
    <div style={{ flex: 1 }}>
      <h3 className="column-name text-center">#</h3>
    </div>
  );
};

const Title = (props) => {
  return (
    <div style={{ flex: 8 }}>
      <h3 className="column-name text-left">Tiêu đề</h3>
    </div>
  );
};

const Album = (props) => {
  return (
    <div style={{ flex: 5 }}>
      <h3 className="column-name tablet-hidden text-left">Album</h3>
    </div>
  );
};

const DateAdded = (props) => {
  return (
    <div style={{ flex: 3 }}>
      <h3 className="column-name tablet-hidden text-left">Ngày thêm</h3>
    </div>
  );
};

const Artists = (props) => {
  const { isList } = props;

  if (isList) return null;
  return (
    <div style={{ flex: 5 }} className="tablet-hidden">
      <h3 className="column-name text-left">Nghệ sĩ</h3>
    </div>
  );
};

const Time = (props) => {
  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <h3 style={{ marginRight: 10, textAlign: 'right' }}>
        <Clock />
      </h3>
    </div>
  );
};

const Space = (props) => {
  return <div style={{ flex: 1 }} className="tablet-hidden"></div>;
};

const TableHeader = memo((props) => {
  const { view, fields } = props;
  const isList = view === 'LIST';

  return (
    <div
      style={{ color: '#bababa' }}
      className="mobile-hidden flex justify-between items-center py-2"
    >
      {fields.map((Field, index) => (
        <Field key={index} isList={isList} />
      ))}
    </div>
  );
});

export default TableHeader;

export const TableHeaderComponents = {
  Index,
  Title,
  Artists,
  Time,
  Space,
  Album,
  DateAdded,
};
