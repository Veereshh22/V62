const express = require('express');
const router = express.Router();
const { getChartData, getYearlyInsights } = require('../controllers/chartController');
const authMiddleware = require('../middleware/auth');

// Protect routes with authentication middleware
router.get('/charts', authMiddleware, getChartData);
router.get('/insights', authMiddleware, getYearlyInsights);

module.exports = router;