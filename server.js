const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Page Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/public/about.html'));
app.get('/products', (req, res) => res.sendFile(__dirname + '/public/products.html'));
app.get('/order', (req, res) => res.sendFile(__dirname + '/public/order.html'));
app.get('/contact', (req, res) => res.sendFile(__dirname + '/public/contact.html'));

// Contact Form POST Handler
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'NashVarietyStore@gmail.com',
      pass: 'qmfn zffu liwm bvfy' 
    }
  });

  const mailOptions = {
    from: email,
    to: 'NashVarietyStore@gmail.com',
    subject: `Contact Form - ${subject}`,
    text: `From: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending mail:', error);
      return res.redirect('/contact?status=error'); // ⛔️ error handling
    } else {
      console.log('Email sent:', info.response);
      return res.redirect('/contact?status=success'); // ✅ success redirect
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

