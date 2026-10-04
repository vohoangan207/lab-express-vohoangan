// --- PHẦN 1: KHỞI TẠO ---
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- PHẦN 2: MIDDLEWARE KIỂM TRA TUỔI ---
// Đề yêu cầu tạo middleware kiểm tra age
const checkAgeMiddleware = (req, res, next) => {
    const age = parseInt(req.query.age); // Lấy tuổi từ URL (Query String)

    // Nếu tuổi nhỏ hơn 18, báo lỗi và chặn lại
    if (!age || age < 18) {
        return res.status(403).json({
            error: "Truy cập thất bại: Cần phải từ 18 tuổi trở lên!"
        });
    }
    
    // Nếu tuổi từ 18 trở lên, cho phép đi tiếp xuống Phần 3[cite: 1]
    next(); 
};

// --- PHẦN 3: ROUTE HANDLER ---
// Tạo API GET /api/info và nhét checkAgeMiddleware vào giữa[cite: 1]
app.get('/api/info', checkAgeMiddleware, (req, res) => {
    // Lấy tên và tuổi từ Query String[cite: 1]
    const name = req.query.name;
    const age = req.query.age;

    // Trả về kết quả[cite: 1]
    res.json({
        message: "Thành công!",
        name: name,
        age: age
    });
});

// Bật server chạy ở cổng 3000
app.listen(port, () => {
    console.log(`Server chạy tại: http://localhost:${port}`);
});