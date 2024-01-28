const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7982',
    database: 'medical_centre',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/appointments', (req, res) => {
    const { dname, date, time, yourname, youremail } = req.body;
    const query = 'INSERT INTO appointments (dname, date, time, yourname, youremail) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [dname, date, time, yourname, youremail], (error, results) => {
        if (error) {
            res.status(500).json({ success: false, error: error.message });
            return;
        }

        res.json({ success: true, appointment: { id: results.insertId, dname, date, time, yourname, youremail } });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

