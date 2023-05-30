const Candy = require('../models/candy');

exports.getCandies = async (req, res, next) => {
    try {
        const candies = await Candy.findAll();
        res.status(200).json(candies);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

exports.postCandy = async (req, res, next) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const candy = await Candy.create({name: name, description: description, price: price, quantity: quantity});
        res.status(200).json(candy);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

exports.putBuyOne = async (req, res, next) => {
    try {
        const candy = await Candy.update(req.body, {where: {id: req.params.id}});
        res.status(200).json(candy);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}