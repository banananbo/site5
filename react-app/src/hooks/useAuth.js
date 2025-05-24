import { useState, useEffect, useCallback, useRef } from 'react';
import api from 'services/api'; // services/api をインポート

function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const initRef = useRef(false);

  // ユーザー情報取得
  const fetchUser = useCallback(async (skipLoading = false) => {
    if (!skipLoading) {
      setAuthLoading(true);
    }

    try {
      console.log('fetchUser - API呼び出し開始');
      const response = await api.get('/api/me');
      console.log('fetchUser - APIレスポンス:', response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('fetchUser - 未認証状態');
        setUser(null);
      } else {
        console.error('fetchUser - エラー:', error);
      }
      return null;
    } finally {
      if (!skipLoading) {
        setAuthLoading(false);
      }
    }
  }, []);

  // 初回マウント時にユーザー情報取得
  useEffect(() => {
    if (!initRef.current) {
      console.log('useAuth - 初期化');
      initRef.current = true;
      fetchUser();
    }
  }, [fetchUser]);

  // ログイン
  const handleLogin = useCallback(async () => {
    const res = await api.get("/api/auth/login_url");
    window.location.href = res.data.authorizationUrl;
  }, []);

  // ログアウト
  const handleLogout = useCallback(async () => {
    console.log('useAuth - ログアウト');
    setUser(null);
    // バックエンドのログアウトエンドポイントを呼び出してCookieを削除
    const res = await api.post("/api/auth/logout");
    // レスポンスからAuth0のログアウトURLを取得してリダイレクト
    if (res.data && res.data.logoutUrl) {
      window.location.href = res.data.logoutUrl;
    } else {
      // 失敗時はトップページなどにリダイレクト
      window.location.href = "/";
    }
  }, []);

  return {
    user,
    authLoading,
    fetchUser,
    handleLogin,
    handleLogout,
  };
}

export default useAuth; 