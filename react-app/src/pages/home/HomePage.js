import React from 'react';

function HomePage({
  user,
  authLoading,
  handleLogin,
  handleLogout,
}) {
  if (authLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>ホームページ</h1>
      {user ? (
        <div>
          <p>ログイン中: {user.name} ({user.email})</p>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={handleLogin}>ログイン</button>
        </div>
      )}
    </div>
  );
}

export default HomePage; 