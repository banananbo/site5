import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [hostname, setHostname] = useState('読み込み中...');

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  return (
    <div className="container">
      <h1>Traefik と Docker による環境分離デモ</h1>
      <p>このページは Traefik を使って <span className="host">{hostname}</span> でホストされています</p>
    </div>
  );
}

export default App;
