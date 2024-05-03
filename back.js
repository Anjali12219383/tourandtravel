const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tour_travel', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema for tour plans
const tourPlanSchema = new mongoose.Schema({
    name: String,
    destination: String,
    startDate: Date,
    endDate: Date,
    numberOfPeople: Number,
});

const TourPlan = mongoose.model('TourPlan', tourPlanSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Tour and Travel website!');
});

// Route to book a tour plan
app.post('/book', async (req, res) => {
    try {
        const { name, destination, startDate, endDate, numberOfPeople } = req.body;
        const tourPlan = new TourPlan({
            name,
            destination,
            startDate,
            endDate,
            numberOfPeople,
        });
        const savedPlan = await tourPlan.save();
        res.status(201).json(savedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
