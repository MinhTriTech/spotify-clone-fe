import { DeviceItem } from './device';

// Redux
import { useAppSelector } from '../../../../../../store/store';
import { getOtherDevices } from '../../../../../../store/slices/spotify';

const DevicesList = () => {
  const devices = useAppSelector(getOtherDevices);

  if (!devices || !devices.length) return null;

  return (
    <div>
      <h2 className="device-list-title">Chọn thiết bị khác</h2>
      <ul className="device-list">
        {devices.map((device) => (
          <li key={device.id}>
            <DeviceItem device={device} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevicesList;
