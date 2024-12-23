const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const teacherRoutes = require('./routes/teacherRoutes');
const positionRoutes = require('./routes/positionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route gốc
app.get('/', (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/teachers', teacherRoutes);
app.use('/teacher-positions', positionRoutes);

// Kết nối DB
connectDB();

module.exports = app;
