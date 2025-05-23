import { useEffect, useState } from 'react';
import api from 'services/api'; // services/api をインポート

function useAuth() {
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
    setUser(null); // クライアント側でもユーザー情報をクリア
  };

  return { user, authLoading, handleLogin, handleLogout, fetchUser };
}

export default useAuth; 