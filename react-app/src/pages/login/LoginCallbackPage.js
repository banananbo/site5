import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// App.jsからaxiosインスタンスを流用する場合
// import { api } from './App';

// 新しいaxiosインスタンスを作成するか、App.jsから渡す
// const api = axios.create({ ... }); // services/api.jsに移動
import api from 'services/api'; // services/api をインポート

function LoginCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    // ローカルストレージから保存されていた遷移先のパスを取得
    const redirectPath = localStorage.getItem('loginRedirectPath') || '/';
    // 使用後は削除
    localStorage.removeItem('loginRedirectPath');
    
    if (code) {
      api
        .post("/api/auth/code", { code })
        .then(() => {
          // 保存されていたパスに遷移
          navigate(redirectPath, { replace: true });
        })
        .catch(error => {
          console.error("Error exchanging code:", error);
          navigate(redirectPath, { replace: true });
        });
    } else {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="loginCallback">
      <div className="loadingMessage">
        ログイン処理中です...
      </div>
    </div>
  );
}

export default LoginCallbackPage; 