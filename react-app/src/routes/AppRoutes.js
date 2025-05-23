import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'pages/home/HomePage'; // 作成したHomePageコンポーネントをインポート
import LoginCallbackPage from 'pages/login/LoginCallbackPage';

function AppRoutes({
  user,
  authLoading,
  handleLogin,
  handleLogout,
}) {
  return (
    <Routes>
      {/* ルートパス */}
      <Route
        path="/"
        element={
          <HomePage
            user={user}
            authLoading={authLoading}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        }
      />
      {/* 認証コールバックパス */}
      <Route path="/login_callback" element={<LoginCallbackPage />} />

      {/* 他のパスも必要に応じて追加 */}
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
    </Routes>
  );
}

export default AppRoutes; 