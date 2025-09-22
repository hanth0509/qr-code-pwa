import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const HISTORY_KEY = 'qr_history';

function QRGenerator() {
    const [inputText, setInputText] = useState('');
    const [qrSize, setQrSize] = useState(256);

    // Save QR to localStorage history
    const saveToHistory = (value) => {
        if (!value) return;

        let data = [];
        try {
            data = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        } catch {
            data = [];
        }

        // Create new item
        const newItem = {
            id: Date.now(), 
            content: value,
            type: value.startsWith('http') ? 'url' : 'text',
            timestamp: new Date().toLocaleString()
        };

        // Check duplication and add to the top of the array
        const isDuplicate = data.some(item => item.content === value);
        if (!isDuplicate) {
            data.unshift(newItem);
            //Limit only the nearest 50 item
            localStorage.setItem(HISTORY_KEY, JSON.stringify(data.slice(0, 50)));
        }
        window.dispatchEvent(new CustomEvent('historyUpdated'));
    };

    // Download QR code as PNG
    const downloadQRCode = () => {
        const canvas = document.getElementById('qrcode-canvas');
        if (!canvas) return;

        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        saveToHistory(inputText);
    };

    // Copy QR text to clipboard
    const copyText = () => {
        navigator.clipboard.writeText(inputText);
        alert('QR text copied to clipboard!');
    };

    return (
        <div style={{ padding: 20, textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
            <h2>QR Code Generator</h2>

            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter URL or text..."
                rows={4}
                style={{
                    width: '100%',
                    padding: 10,
                    border: '2px solid #007bff',
                    borderRadius: 8,
                    fontSize: 16,
                    marginBottom: 15,
                    fontFamily: 'inherit',
                    minHeight: 100,
                }}
            />

            <div style={{ marginBottom: 20 }}>
                <label>Size: </label>
                <select
                    value={qrSize}
                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                    style={{
                        padding: 8,
                        border: '2px solid #007bff',
                        borderRadius: 5,
                        fontSize: 14,
                        marginLeft: 10,
                    }}
                >
                    <option value={128}>128px</option>
                    <option value={256}>256px</option>
                    <option value={512}>512px</option>
                </select>
            </div>

            {inputText && (
                <div
                    style={{
                        marginTop: 20,
                        padding: 20,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 10,
                        border: '1px solid #ddd',
                    }}
                >
                    <QRCodeCanvas
                        id="qrcode-canvas"
                        value={inputText}
                        size={qrSize}
                        level="H"
                        includeMargin={true}
                    />

                    <div style={{ marginTop: 15, display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button
                            onClick={downloadQRCode}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                fontSize: 16,
                                cursor: 'pointer',
                            }}
                        >
                            📥 Download QR Code
                        </button>

                        <button
                            onClick={copyText}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#17a2b8',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                fontSize: 16,
                                cursor: 'pointer',
                            }}
                        >
                            📋 Copy Text
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QRGenerator;
