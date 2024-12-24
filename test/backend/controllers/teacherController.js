const Teacher = require('../models/Teacher');
const User = require('../models/User');

// 1.1 & 1.2 GET /teachers với phân trang
exports.getTeachers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const teachers = await Teacher.find()
            .populate('userId', 'name email phoneNumber address')
            .populate('positions', 'name code') 
            .select('code isActive startDate degrees positions')
            .skip(skip)
            .limit(limit);

        const total = await Teacher.countDocuments();

        res.json({
            success: true,
            data: teachers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        });
    } catch (error) {
        console.error('Error in getTeachers:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// 1.3 POST /teachers
exports.createTeacher = async (req, res) => {
    try {
        // Tạo mã giáo viên ngẫu nhiên
        let code;
        let isCodeUnique = false;
        
        while (!isCodeUnique) {
            code = Math.floor(10000 + Math.random() * 90000).toString();
            const existingTeacher = await Teacher.findOne({ code });
            if (!existingTeacher) isCodeUnique = true;
        }

        // Kiểm tra user đã tồn tại
        const existingUser = await User.findById(req.body.userId);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                error: 'User không tồn tại'
            });
        }

        const teacher = await Teacher.create({
            ...req.body,
            code
        });

        res.status(201).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
