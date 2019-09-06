const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DisLikeControllet = require('./controllers/DisLikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devID/likes', LikeController.store);
routes.post('/devs/:devID/dislikes', DisLikeControllet.store);

module.exports = routes;