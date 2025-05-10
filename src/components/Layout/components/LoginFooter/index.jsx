import { memo, useCallback } from 'react';
import WhiteButton from '../../../Button';

import { uiActions } from '../../../../store/slices/ui';
import { useAppDispatch } from '../../../../store/store';

export const LoginFooter = memo(() => {
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(() => {
      dispatch(uiActions.toggleLoginModalMain());
    }, [dispatch]);

  return (
    <div className='login-footer' style={{ margin: '0px 10px' }}>
      <div className='login-container'>
        <div>
          <p className='title' style={{ textAlign: 'start' }}>Xem trước</p>
          <p className='description'>Đăng nhập để sử dụng đầy đủ tính năng của ứng dụng.</p>
        </div>

        <WhiteButton title="Đăng nhập" onClick={handleLogin}/>
      </div>
    </div>
  );
});
