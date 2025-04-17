import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin, handleRegister, handleGetUser } from '../../store/slices/auth';
import { GoogleIcon } from '../../components/Icons';
import { uiActions } from '../../store/slices/ui';

function LoginPage() {
  const dispatch = useDispatch();

  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    setErrorMessage('');
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(handleLogin({ username, password })).unwrap();
      console.log('Đăng nhập thành công');
      // dispatch(uiActions.toggleLoginModalMain());
    } catch (err) {
      console.error('Đăng nhập thất bại:', err);
      setErrorMessage('Đăng nhập thất bại. Kiểm tra username và password.');
    }
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu không khớp.');
      return;
    }
    try {
      await dispatch(handleRegister({ username, email, password })).unwrap();
      console.log('Đăng ký thành công');
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setIsRegistering(false);
    } catch (err) {
      console.error('Đăng ký thất bại:', err);
      setErrorMessage('Đăng ký thất bại. Username hoặc Email đã tồn tại.');
    }
  };

  // Xóa sau khi test
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(handleGetUser()).unwrap();
      console.log('Thông tin người dùng đã được tải');
    } catch (err) {
      console.log('Thất bại');
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage('');
  };

  const handleViewWithoutLogin = () => {
    dispatch(uiActions.toggleLoginModalMain());
  };

  const handleClosePage = () => {
    dispatch(uiActions.toggleLoginModalMain());
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClosePage} className="closeButton">&times;</button>
        <h2 className="title">{isRegistering ? 'Đăng ký' : 'Đăng nhập'}</h2>
        
        <form onSubmit={isRegistering ? handleRegisterForm : handleLoginForm} className="form">
          <div className="inputGroup">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          {isRegistering && (
            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="inputGroup">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          {isRegistering && (
            <div className="inputGroup">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                required
              />
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
