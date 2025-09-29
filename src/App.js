import React, { useState } from 'react';
import './App.css';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import QRHistory from './components/QRHistory';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="App">
      <header className="App-header">
        <h1> QR Code App</h1>
        <p>PWA application to create and scan the QR code</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={activeTab === 'generator' ? 'active' : ''}
          onClick={() => setActiveTab('generator')}
        >
          🖨️ Create QR
        </button>
        <button
          className={activeTab === 'scanner' ? 'active' : ''}
          onClick={() => setActiveTab('scanner')}
        >
          📷 Scan QR
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'generator' && <QRGenerator />}
        {activeTab === 'scanner' && <QRScanner />}
         <QRHistory />
      </main>

      <footer className="App-footer">
        <p>Install on the phone to conveniently scan the QR Text/Link and read QR Code from the camera. 📱</p>
      </footer>
    </div>
  );
}

export default App;