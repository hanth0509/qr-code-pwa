import React, { useEffect, useState } from 'react';

const HISTORY_KEY = 'qr_history';

function QRHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleHistoryUpdate = () => {
      try {
        const stored = localStorage.getItem(HISTORY_KEY);
        const data = stored ? JSON.parse(stored) : [];
        setHistory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading history:', error);
        setHistory([]);
      }
    };


    window.addEventListener('historyUpdated', handleHistoryUpdate);

    return () => {
      window.removeEventListener('historyUpdated', handleHistoryUpdate);
    };
  }, []);

  // Clear all history
  const clearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  // Delete item 
  const deleteItem = (id) => {
    try {
      const newHistory = history.filter(item => item.id !== id);
      setHistory(newHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // check history
  if (!history || history.length === 0) {
    return (
      <div style={{
        margin: 20,
        color: '#888',
        textAlign: 'center',
        padding: '40px 0'
      }}>
        📝 No QR history yet.
      </div>
    );
  }

  return (
    <div style={{ margin: 20 }}>
      <h3>📋 QR Code History</h3>
      <button
        onClick={clearHistory}
        style={{
          marginBottom: 20,
          color: 'white',
          background: '#dc3545',
          border: 'none',
          borderRadius: 5,
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        🗑️ Clear All History
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {history.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: 15,
              background: '#f8f9fa',
              padding: 15,
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #dee2e6'
            }}
          >
            <div style={{ flex: 1, wordBreak: 'break-all' }}>
              <strong>{item.type === 'url' ? '🌐 ' : '📄 '}</strong>
              {item.content}
              <br />
              <small style={{ color: '#6c757d', fontSize: '12px' }}>
                ⏰ {item.timestamp}
              </small>
            </div>

            <button
              onClick={() => deleteItem(item.id)}
              style={{
                marginLeft: 10,
                color: 'white',
                background: '#6c757d',
                border: 'none',
                borderRadius: 5,
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QRHistory;