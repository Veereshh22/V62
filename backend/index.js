const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const chartRoutes = require('./routes/chart');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chartData', chartRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`V62 Server running on ${PORT}`);
});