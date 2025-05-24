import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import styles from './TopBar.module.css';

function TopBar() {
  const { user, authLoading, handleLogin, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  const handleUserNameClick = () => {
    navigate('/profile');
  };

  const handleTitleClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        <div 
          className={`${styles.topBarTitle} ${styles.clickable}`}
          onClick={handleTitleClick}
        >
          Auth0 Login Demo
        </div>
        <div className={styles.topBarRightContent}>
          {authLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : user ? (
            <div className={styles.userInfo}>
              <span 
                className={`${styles.userName} ${styles.clickable}`}
                onClick={handleUserNameClick}
              >
                {user.name || user.nickname}
              </span>
              {user.picture && (
                <img 
                  src={user.picture} 
                  alt="User Avatar" 
                  className={`${styles.userAvatar} ${styles.clickable}`}
                  onClick={handleUserNameClick}
                />
              )}
              <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
                ログアウト
              </button>
            </div>
          ) : (
            <button className={`${styles.button} ${styles.loginButton}`} onClick={handleLogin}>
              ログイン
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar; 