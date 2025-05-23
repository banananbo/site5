import React from 'react';
import 'styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes/AppRoutes';
import useAuth from 'hooks/useAuth';

function App() {
  const { user, authLoading, handleLogin, handleLogout } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Auth0 ログインデモ</h1>
        <AppRoutes
          user={user}
          authLoading={authLoading}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
