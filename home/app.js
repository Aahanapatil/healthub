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

document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const confirmationSection = document.getElementById("confirmation");
    const confirmedName = document.getElementById("confirmedName");
    const confirmedDoctor = document.getElementById("confirmedDoctor");
    const confirmedDate = document.getElementById("confirmedDate");
    const confirmedTime = document.getElementById("confirmedTime");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const selectedDoctor = document.getElementById("doctor").value;
        const selectedDate = document.getElementById("date").value;
        const selectedTime = document.getElementById("time").value;
        const userName = document.getElementById("name").value;
        const userEmail = document.getElementById("email").value;

        // Update confirmation section
        confirmedName.innerText = userName;
        confirmedDoctor.innerText = selectedDoctor;
        confirmedDate.innerText = selectedDate;
        confirmedTime.innerText = selectedTime;

        // Make an AJAX request to your backend to store the appointment data
        fetch('http://localhost:3000/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dname: selectedDoctor,
                date: selectedDate,
                time: selectedTime,
                yourname: userName,
                youremail: userEmail,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Appointment booked successfully!');
            // Optionally, you can redirect the user to a confirmation page
            // window.location.href = 'confirmation.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to book appointment. Please try again.');
        });

        // Hide booking form, show confirmation
        bookingForm.classList.add("hidden");
        confirmationSection.classList.remove("hidden");
    });
});
