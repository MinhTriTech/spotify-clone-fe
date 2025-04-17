import { Input, Space } from 'antd';
import NavigationButton from './NavigationButton';
import { ActiveMessageIcon, ActiveHomeIcon, BrowseIcon, HomeIcon, MessageIcon, SearchIcon } from '../../../Icons';

// ❌ Đã xoá useTranslation
import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

const INITIAL_VALUE = window.location.href.includes('/search/')
  ? window.location.href.split('/').reverse()[0]
  : '';

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const Search = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounce(inputValue, 600);
  const prevValue = usePrevious(debouncedValue);

  useEffect(() => {
    if (debouncedValue !== '' && debouncedValue !== prevValue) {
      navigate(`/search/${debouncedValue}`);
    }
  }, [debouncedValue, prevValue, navigate]);

  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);

  return (
    <Space size={10} align="center">
      <NavigationButton
        text="Trang chủ"
        icon={isHome ? <ActiveHomeIcon /> : <HomeIcon />}
        onClick={() => navigate('/')}
      />

      <NavigationButton
        text="Tin nhắn"
        icon={isHome ? <ActiveMessageIcon /> : <MessageIcon />}
        onClick={() => navigate('/')}
      />

      <Input
        size="large"
        className="search-input"
        prefix={<SearchIcon />}
        suffix={
          <button
            onClick={() => {
              navigate('/search');
            }}
          >
            <BrowseIcon />
          </button>
        }
        defaultValue={INITIAL_VALUE}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Tìm kiếm bài hát, nghệ sĩ, playlist..."
      />
    </Space>
  );
});
