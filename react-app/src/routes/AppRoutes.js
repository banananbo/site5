import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'pages/home/HomePage'; // 作成したHomePageコンポーネントをインポート
import LoginCallbackPage from 'pages/login/LoginCallbackPage';
import DashboardPage from 'pages/dashboard/DashboardPage';
import UserProfilePage from 'pages/user/UserProfilePage';

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
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <HomePage
              user={user}
              authLoading={authLoading}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          )
        }
      />
      {/* 認証コールバックパス */}
      <Route path="/login_callback" element={<LoginCallbackPage />} />
      
      {/* ダッシュボード */}
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            user={user}
            authLoading={authLoading}
          />
        }
      />

      {/* ユーザープロフィール */}
      <Route
        path="/profile"
        element={
          <UserProfilePage
            user={user}
            authLoading={authLoading}
          />
        }
      />

      {/* 404ページ */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes; 