const Position = require('../models/TeacherPosition');

// 1.4 GET /teacher-positions
exports.getPositions = async (req, res) => {
    try {
        const positions = await Position.find();
        res.json({
            success: true,
            data: positions
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 1.5 POST /teacher-positions
exports.createPosition = async (req, res) => {
    try {
        // Kiểm tra code trùng
        const existingPosition = await Position.findOne({ code: req.body.code });
        if (existingPosition) {
            return res.status(400).json({
                success: false,
                error: 'Mã vị trí công tác đã tồn tại'
            });
        }

        const position = await Position.create(req.body);
        res.status(201).json({
            success: true,
            data: position
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
