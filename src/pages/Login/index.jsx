import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../../components/Icons';

function LoginPage() {
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    setErrorMessage('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Đăng nhập với:', { email, password });
    // Gọi API đăng nhập ở đây
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu không khớp.');
      return;
    }
    console.log('Đăng ký với:', { email, password });
    // Gọi API đăng ký ở đây
  };

  const handleGoogleLogin = () => {
    console.log('Đăng nhập bằng Google');
    // Xử lý đăng nhập bằng Google
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage('');
  };

  const handleViewWithoutLogin = () => {
    navigate('/');
  };

  const handleClosePage = () => {
    // Điều hướng về trang trước nếu có lịch sử
    navigate(-1);
    // Hoặc điều hướng về trang chủ
    // navigate('/');
  };

  return (
    <div className="modalOverlay"> {/* Loại bỏ onClick={onClose} */}
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClosePage} className="closeButton"> {/* Sử dụng handleClosePage */}
          &times;
        </button>
        <h2 className="title">{isRegistering ? 'Đăng ký' : 'Đăng nhập'}</h2>
        {/* Phần form và các nút khác giữ nguyên */}
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="form">
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleInputChange} required />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Mật khẩu:</label>
            <input type="password" id="password" name="password" value={password} onChange={handleInputChange} required />
          </div>
          {isRegistering && (
            <div className="inputGroup">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} required />
            </div>
          )}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="submitButton">
            {isRegistering ? 'Đăng ký' : 'Đăng nhập'}
          </button>
        </form>

        <div className="separator">Hoặc</div>

        <button className="googleButton" onClick={handleGoogleLogin}>
          <GoogleIcon />
          Đăng nhập bằng Google
        </button>

        <button type="button" className="viewWithoutLoginButton" onClick={handleViewWithoutLogin}>
          Xem mà không cần đăng nhập
        </button>

        <p className="toggleText">
          {isRegistering ? (
            <>
              Đã có tài khoản? <button type="button" onClick={toggleRegister} className="toggleButton">Đăng nhập</button>
            </>
          ) : (
            <>
              Chưa có tài khoản? <button type="button" onClick={toggleRegister} className="toggleButton">Đăng ký</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;