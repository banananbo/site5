import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginCallbackPage from './LoginCallbackPage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
});

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ユーザー情報取得
  const fetchUser = async () => {
    setAuthLoading(true);
    try {
      const res = await api.get("/api/me");
      setUser(res.data);
    } catch (e) {
      setUser(null);
    }
    setAuthLoading(false);
  };

  // 初回マウント時にユーザー情報取得
  useEffect(() => {
    fetchUser();
  }, []);

  // ログイン
  const handleLogin = async () => {
    const res = await api.get("/api/auth/login_url");
    window.location.href = res.data.authorizationUrl;
  };

  // ログアウト
  const handleLogout = async () => {
    const res = await api.post("/api/auth/logout");
    window.location.href = res.data.logoutUrl;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Auth0 ログインデモ</h1>
        <Routes>
          <Route path="/" element={
            authLoading ? (
              <div>Loading...</div>
            ) : user ? (
              <div>
                <p>ログイン中: {user.name} ({user.email})</p>
                <button onClick={handleLogout}>ログアウト</button>
              </div>
            ) : (
              <button onClick={handleLogin}>ログイン</button>
            )
          } />
          <Route path="/login_callback" element={<LoginCallbackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
