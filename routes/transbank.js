const express = require('express');
const router = express.Router();
const transbankController = require('../controllers/transbankController');

router.post('/create', transbankController.createTransaction);
router.get('/commit', transbankController.commitTransaction);
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'transbank' });
});

module.exports = router;