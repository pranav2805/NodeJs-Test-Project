const express = require('express');

const router = express.Router();

const candyController = require('../controllers/candyCont');

router.get('/candies', candyController.getCandies);

router.post('/candies', candyController.postCandy);

router.put('/candies/buy-candy/:id', candyController.putUpdateQuantity);

module.exports = router;