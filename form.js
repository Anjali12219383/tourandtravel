// Inside back.js

document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('booking-form');

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(bookingForm);

        // Convert FormData to JSON
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Send data to backend
        fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to book tour plan');
            }
            return response.json();
        })
        .then(data => {
            alert('Tour plan booked successfully!');
            // Clear form fields after successful submission
            bookingForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to book tour plan. Please try again later.');
        });
    });
});
