import React from 'react';
import 'styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'routes/AppRoutes';
import TopBar from 'components/layout/TopBar';
import { AuthProvider } from 'contexts/AuthContext';
import { useAuthContext } from 'contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const { user, authLoading, handleLogin, handleLogout } = useAuthContext();

  return (
    <>
      <TopBar />
      <main className="mainContent">
        <AppRoutes
          user={user}
          authLoading={authLoading}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </main>
    </>
  );
}

export default App;
