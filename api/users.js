const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'olwe-data'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/register', async (req, res) => {
    const { fullname, email, mobile, password } = req.body;

    // Gelen isteğin içeriğini kontrol et
    if (!fullname || !email || !mobile || !password) {
        return res.status(400).json({ message: 'Missing fields in request body' });
    }

    // Şifreyi hash'leme
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)';
    db.query(query, [fullname, email, mobile, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Kullanıcı girişi için JWT oluşturma
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Gelen isteğin içeriğini kontrol et
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields in request body' });
    }

    // Veritabanında kullanıcıyı bul
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, result) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Kullanıcı bulunamadıysa
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kullanıcıyı bulundu, şifreyi kontrol et
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // JWT oluştur
        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

        // Başarılı giriş
        res.status(200).json({ message: 'Login successful', token: token });
    });
});

// Örnek korumalı bir endpoint
app.get('/protected', (req, res) => {
    // Kullanıcı kimliğini doğrula
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Kullanıcı kimliği doğrulandıysa korumalı veriye erişim izni ver
        res.status(200).json({ message: 'Protected data', userId: decoded.userId });
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
