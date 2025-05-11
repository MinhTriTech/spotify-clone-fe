import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin, handleRegister, handleLoginWithGoogle } from '../../store/slices/auth';
import { uiActions } from '../../store/slices/ui';

import { GoogleLogin  } from '@react-oauth/google';

function LoginPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('login');
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
      dispatch(uiActions.toggleLoginModalMain());
    } catch (err) {
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
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setActiveTab('login');
    } catch (err) {
      setErrorMessage('Đăng ký thất bại.');
    }
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
        <button onClick={handleClosePage} className="closeButton">×</button>
        <div className="contentWrapper">
          <div className="leftColumn">
            <div className="tabContainer">
              <button
                className={`tabButton ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Đăng nhập
              </button>
              <button
                className={`tabButton ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Đăng ký
              </button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={handleLoginForm} className="form">
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
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" className="submitButton">Đăng nhập</button>
              </form>
            ) : (
              <form onSubmit={handleRegisterForm} className="form">
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
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" className="submitButton">Đăng ký</button>
              </form>
            )}
          </div>

          <div className="verticalSeparator"></div>

          <div className="separator">Hoặc</div>

          <div className="rightColumn">
            <div className="googleLoginWrapper">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const token = credentialResponse.credential;
                  dispatch(handleLoginWithGoogle({ token }));
                }}
                onError={() => {
                  setErrorMessage('Đăng nhập bằng Google thất bại.');
                }}
                width="100%"
              />
            </div>


            <button
              type="button"
              className="viewWithoutLoginButton"
              onClick={handleViewWithoutLogin}
            >
              Xem mà không cần đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;