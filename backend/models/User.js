const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    identity: { type: String, required: true },
    dob: { type: Date, required: true },
    role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
