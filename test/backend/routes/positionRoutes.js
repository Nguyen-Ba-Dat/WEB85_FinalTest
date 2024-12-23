const express = require('express');
const { getPositions, createPosition } = require('../controllers/positionController');

const router = express.Router();

router.get('/', getPositions);
router.post('/', createPosition);

module.exports = router;
