import React from 'react';
import { Navigate } from 'react-router-dom';

function DashboardPage({ user, authLoading }) {
  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div>
      <h1>ダッシュボード</h1>
      <div>
        <h2>ようこそ、{user.name || user.nickname}さん</h2>
        <p>ここはダッシュボードページです。</p>
      </div>
    </div>
  );
}

export default DashboardPage; 