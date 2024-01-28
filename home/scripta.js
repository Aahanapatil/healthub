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
        const userEmail = document.getElementById("email").value;  // Add this line

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
                youremail: userEmail,  // Add this line
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
            alert('Booking Done');
        });

        // Hide booking form, show confirmation
        bookingForm.classList.add("hidden");
        confirmationSection.classList.remove("hidden");
    });
});

