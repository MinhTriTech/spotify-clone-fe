import { useNavigate } from 'react-router-dom';
import { HomeIcon, LibraryIcon, SearchIcon } from '../../../Icons';

// ❌ Đã xoá useTranslation

// Redux
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../../store/slices/ui';

export const MobileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <footer className='mobile-menu'>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        <HomeIcon />
        <p>Trang chủ</p>
      </button>

      <button
        onClick={() => {
          navigate('/search');
        }}
      >
        <SearchIcon />
        <p>Tìm kiếm</p>
      </button>

      <button onClick={() => dispatch(uiActions.toggleLibrary())}>
        <LibraryIcon />
        <p>Thư viện</p>
      </button>
    </footer>
  );
};
