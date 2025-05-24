import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './UserProfilePage.module.css';

function UserProfilePage({ user, authLoading }) {
  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className={styles.container}>
      <h1>ユーザープロフィール</h1>
      <div className={styles.profileCard}>
        {user.picture && (
          <img src={user.picture} alt="プロフィール画像" className={styles.profileImage} />
        )}
        <div className={styles.profileInfo}>
          <h2>{user.name || user.nickname}</h2>
          {user.email && <p>メールアドレス: {user.email}</p>}
          {user.email_verified && <p>✓ メール認証済み</p>}
          <p>最終更新: {new Date(user.updated_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage; 