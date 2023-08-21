const express = require('express');

const rentHome = require('./rentHome');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/renthome', rentHome);

module.exports = router;
