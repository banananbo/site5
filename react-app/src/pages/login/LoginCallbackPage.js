import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import api from 'services/api';
import styles from './LoginCallbackPage.module.css';

// App.jsからaxiosインスタンスを流用する場合
// import { api } from './App';

// 新しいaxiosインスタンスを作成するか、App.jsから渡す
// const api = axios.create({ ... }); // services/api.jsに移動

function LoginCallbackPage() {
  const navigate = useNavigate();
  const { fetchUser } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(true);
  const [status, setStatus] = useState('認証コードを確認中...');

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        if (isMounted) {
          setStatus('認証コードが見つかりません');
          setTimeout(() => navigate('/', { replace: true }), 2000);
        }
        return;
      }

      try {
        if (isMounted) {
          setStatus('認証コードを処理中...');
        }
        await api.post("/api/auth/code", { code });
        
        if (isMounted) {
          setStatus('ユーザー情報を取得中...');
        }
        const userData = await fetchUser(true);

        if (userData && isMounted) {
          setStatus('ログイン成功！リダイレクト中...');
          // ユーザー情報の更新が確実に反映されるまで少し待つ
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate('/dashboard', { replace: true });
        } else if (isMounted) {
          setStatus('ユーザー情報の取得に失敗しました');
          setTimeout(() => navigate('/', { replace: true }), 2000);
        }
      } catch (error) {
        console.error("ログインエラー:", error);
        if (isMounted) {
          setStatus('ログイン処理中にエラーが発生しました');
          setTimeout(() => navigate('/', { replace: true }), 2000);
        }
      } finally {
        if (isMounted) {
          setIsProcessing(false);
        }
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [navigate, fetchUser]);

  return (
    <div className={styles.loginCallback}>
      <div className={styles.loadingMessage}>
        {isProcessing ? (
          <>
            <div className={styles.spinner} />
            <p>{status}</p>
          </>
        ) : (
          <p>{status}</p>
        )}
      </div>
    </div>
  );
}

export default LoginCallbackPage; 