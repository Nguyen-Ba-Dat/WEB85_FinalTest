const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://web85_mindx:web85_mindx_password@cluster0.r1fmx.mongodb.net/WEB85');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
