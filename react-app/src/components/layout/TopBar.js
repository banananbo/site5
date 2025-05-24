import React from 'react';
import useAuth from 'hooks/useAuth';
import styles from './TopBar.module.css';

function TopBar() {
  const { user, authLoading, handleLogin, handleLogout } = useAuth();

  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        <div className={styles.topBarTitle}>Auth0 Login Demo</div>
        <div className={styles.topBarRightContent}>
          {authLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : user ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name || user.nickname}</span>
              {user.picture && (
                <img src={user.picture} alt="User Avatar" className={styles.userAvatar} />
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