import { memo } from 'react';
import WhiteButton from '../../../Button';
import useIsMobile from '../../../../utils/isMobile';

export const LoginFooter = memo(() => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className='login-footer' style={{ margin: '0px 10px' }}>
      <div className='login-container'>
        <div>
          <p className='title' style={{ textAlign: 'start' }}>Xem trước</p>
          <p className='description'>Đăng nhập để sử dụng đầy đủ tính năng của ứng dụng.</p>
        </div>

        <WhiteButton title="Đăng nhập" />
      </div>
    </div>
  );
});
