import React from 'react';
import 'styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes/AppRoutes';
import useAuth from 'hooks/useAuth';
import TopBar from 'components/layout/TopBar';

function App() {
  const { user, authLoading, handleLogin, handleLogout } = useAuth();

  return (
    <BrowserRouter>
      <TopBar />
      <main className="mainContent">
        <AppRoutes
          user={user}
          authLoading={authLoading}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
