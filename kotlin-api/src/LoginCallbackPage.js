// react-app/src/LoginCallbackPage.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // リダイレクト用

// App.jsからaxiosインスタンスを流用する場合
// import { api } from './App';

// 新しいaxiosインスタンスを作成するか、App.jsから渡す
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
});


function LoginCallbackPage() {
  const navigate = useNavigate(); // リダイレクト用のフック

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    if (code) {
      api
        .post("/api/auth/code", { code })
        .then(() => {
          // 認証成功後、ルートパスにリダイレクト
          // window.history.replaceState({}, document.title, "/"); // これは不要になる
          navigate('/', { replace: true }); // 履歴を置き換えてリダイレクト
        })
        .catch(error => {
          console.error("Error exchanging code:", error);
          // エラー時もルートパスなどにリダイレクト（エラー表示などはお好みで）
          navigate('/', { replace: true });
        });
    } else {
      // codeがない場合（不正なアクセスなど）もルートパスにリダイレクト
      navigate('/', { replace: true });
    }
  }, [navigate]); // navigateを依存配列に追加

  // 処理中はローディング表示など
  return <div>ログイン処理中です...</div>;
}

export default LoginCallbackPage;