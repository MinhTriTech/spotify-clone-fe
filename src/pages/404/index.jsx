import { memo } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

const Page404 = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="container">
        <h3>Trang không khả dụng</h3>
        <p>Có điều gì đó đã sai, vui lòng thử lại sau.</p>

        <button onClick={() => navigate('/')}>Trang chủ</button>
      </div>
    </div>
  );
});

Page404.displayName = 'Page404';

export default Page404;
