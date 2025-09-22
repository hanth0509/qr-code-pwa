QR Code Generator & Scanner PWA:Ứng dụng Progressive Web App (PWA) để tạo và quét mã QR code, hoạt động offline và có thể cài đặt trên điện thoại.

Tính Năng
    Tạo Mã QR: Nhập text/URL → tạo mã QR → tải về máy
    Quét Mã QR: Sử dụng camera để quét mã QR
    PWA: Có thể cài đặt trên màn hình điện thoại
    Offline: Hoạt động không cần kết nối internet
    Responsive: Giao diện tối ưu cho mobile & desktop

Công Nghệ Sử Dụng
    Frontend: React 18, HTML5, CSS3, JavaScript ES6+
    QR Generation: qrcode.react
    QR Scanning: html5-qrcode
    PWA: Service Worker, Web App Manifest
    Storage: LocalStorage
    Build Tool: Create React App

Cài Đặt và Chạy Ứng Dụng
    Điều Kiện Tiên Quyết
    Node.js >= 16.0.0
    npm >= 8.0.0

Các Bước Chạy Ứng Dụng
1. Clone repository
    git clone https://github.com/hanth0509/qr-code-pwa.git
    cd qr-code-pwa

2. Cài đặt dependencies
    npm install

3. Chạy development server
    npm start
Ứng dụng sẽ chạy tại: http://localhost:3000

4. Build production
    npm run build

5. Chạy bản production
    npx http-server build    
    
Hướng Dẫn Sử Dụng
    Tạo Mã QR
        Vào tab "Tạo QR"
        Nhập text hoặc URL vào ô nhập liệu
    =>Mã QR sẽ tự động hiển thị
    Click "Tải QR Code" để tải về máy

    Quét Mã QR
        Vào tab "Quét QR"
        Cho phép ứng dụng truy cập camera
        Đưa mã QR vào khung quét
    =>Kết quả sẽ hiển thị ngay lập tức
        Tải Hình ảnh lên để quét mã QR
    =>Kết quả sẽ hiển thị ngay lập tức

    Lịch sử sẽ được cập sau khi lưu mã qr hoặc quét đc mã qr từ camera hay hình ảnh được tải lên
    Xóa Lịch sử (Tất cả hoặc mã QR muốn xóa)