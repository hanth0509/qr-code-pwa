import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanner() {
    const [scanResult, setScanResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const HISTORY_KEY = 'qr_history';

        const saveToHistory = (value) => {
            if (!value) return;

            const HISTORY_KEY = 'qr_history';
            let data = [];
            try {
                data = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
            } catch {
                data = [];
            }

            // Create a new item 
            const newItem = {
                id: Date.now(), 
                content: value,
                type: value.startsWith('http') ? 'url' : 'text',
                timestamp: new Date().toLocaleString()
            };

            // Check duplication 
            const isDuplicate = data.some(item => item.content === value);
            if (!isDuplicate) {
                data.unshift(newItem);
                // Limit only the nearest 50 item
                localStorage.setItem(HISTORY_KEY, JSON.stringify(data.slice(0, 50)));
            }
            window.dispatchEvent(new CustomEvent('historyUpdated'));
        };
        const scanner = new Html5QrcodeScanner('reader', { qrbox: 300, fps: 10 });

        const onScanSuccess = (result) => {
            console.log('Scan success:', result);
            setScanResult(result);
            setErrorMessage('');
            saveToHistory(result);
            // Clear scanner to stop camera
            scanner.clear().catch(console.error);
        };

        const onScanFailure = (error) => {
            if (error && !error.includes('NotFoundException')) {
                // setErrorMessage('Please point the camera at the QR code');/
            }
        };

        // Start scanning
        scanner.render(onScanSuccess, onScanFailure);

        // Cleanup when component unmounts
        return () => {
            scanner.clear().catch(console.error);
        };
    }, []);

    return (
        <div style={{ padding: 20, textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
            <h2>QR Code Scanner</h2>

            {errorMessage && (
                <div style={{ color: 'red', margin: 10 }}>
                    {errorMessage}
                </div>
            )}

            <div id="reader" style={{ width: '100%', margin: '20px 0' }}></div>

            {scanResult && (
                <div style={{ padding: 20, backgroundColor: '#d4edda', borderRadius: 10, border: '1px solid #c3e6cb' }}>
                    <h3>✅ Scan success!</h3>
                    <div style={{ wordBreak: 'break-all', backgroundColor: 'white', padding: 15, borderRadius: 5 }}>
                        {scanResult}
                    </div>

                    {scanResult.startsWith('http') && (
                        <a
                            href={scanResult}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: 10,
                                backgroundColor: '#007bff',
                                color: 'white',
                                borderRadius: 5,
                                display: 'inline-block',
                                margin: '10px 5px',
                                textDecoration: 'none'
                            }}
                        >
                            🌐 Open link
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default QRScanner;
