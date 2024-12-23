const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, unique: true, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    positions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
    degrees: [
        {
            type: { type: String, required: true },
            school: { type: String, required: true },
            major: { type: String, required: true },
            year: { type: Number, required: true },
            isGraduated: { type: Boolean, required: true },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
