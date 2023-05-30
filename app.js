const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();
app.use(cors());

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const candyRoutes = require('./routes/candyRoute');
app.use(candyRoutes);

sequelize.sync().then((result) => {
    app.listen(4000);
}).catch(err => console.log(err))