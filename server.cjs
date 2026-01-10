const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS ? process.env.GMAIL_PASS.replace(/\s+/g, '') : '',
    },
});

// Diagnostic logging
console.log('Email Configuration Check:');
console.log(`- GMAIL_USER present: ${!!process.env.GMAIL_USER}`);
console.log(`- GMAIL_PASS present: ${!!process.env.GMAIL_PASS}`);
if (process.env.GMAIL_USER) console.log(`- GMAIL_USER length: ${process.env.GMAIL_USER.length}`);
if (process.env.GMAIL_PASS) console.log(`- GMAIL_PASS length: ${process.env.GMAIL_PASS.length}`);

app.get('/', (req, res) => {
    res.send('COJ Mailer Server is running');
});

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.post('/api/send-order-mail', async (req, res) => {
    console.log('--- New Mail Request ---');
    console.log('To:', req.body.to);
    console.log('Order Details:', JSON.stringify(req.body.orderDetails, null, 2));

    const { to, orderDetails } = req.body;

    if (!to || !to.includes('@')) {
        return res.status(400).json({ error: 'Valid recipient email is required.' });
    }

    const mailOptions = {
        from: `"COJ Orders" <${process.env.GMAIL_USER}>`,
        to: to,
        subject: `Order Confirmation - ${orderDetails.customerName}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #fff9f5; border-radius: 20px; border: 1px solid #ffe8d6; max-width: 600px; margin: auto; color: #432818;">
                <h2 style="color: #9c6644; text-align: center; font-size: 28px; margin-bottom: 20px;">Order Confirmed! 🥳</h2>
                <p style="font-size: 16px; line-height: 1.6;">Hello <strong>${orderDetails.customerName}</strong>,</p>
                <p style="font-size: 16px; line-height: 1.6;">Thank you for your order from <strong>Craft of Joy</strong>. Here are your order details:</p>
                
                <div style="background-color: #ffffff; padding: 20px; border-radius: 15px; border: 1px dashed #dcae96; margin: 20px 0;">
                    <p><strong>Customer ID:</strong> ${orderDetails.customerId}</p>
                    <p><strong>Recipient Name:</strong> ${orderDetails.recipientName}</p>
                    <p><strong>Items:</strong><br/> ${orderDetails.items}</p>
                    <p style="font-size: 18px; color: #9c6644;"><strong>Total Amount:</strong> ₹${orderDetails.total}</p>
                </div>

                <p style="font-size: 14px; color: #7f5539; font-style: italic; text-align: center;">"Each piece in our collection is handmade with care and dedication."</p>
                <hr style="border: 0; border-top: 1px solid #ffe8d6; margin: 25px 0;" />
                <p style="text-align: center; color: #b08968; font-size: 12px;">This is an automated email from the COJ Orders system.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Order email sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ error: 'Failed to send confirmation email. Check server configuration.' });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`COJ Mailer Server running on http://127.0.0.1:${PORT}`);
});
