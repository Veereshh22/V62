const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const authMiddleware = require('../middleware/auth');

// Protect routes with authentication middleware
router.post('/charts', authMiddleware, chartController.createChartData);
router.get('/charts', authMiddleware, chartController.getChartData);
router.put('/charts/:id', authMiddleware, chartController.updateChartData);
router.get('/insights', authMiddleware, chartController.getYearlyInsights);

module.exports = router;