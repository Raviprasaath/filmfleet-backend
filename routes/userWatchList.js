const express = require('express');

const route = express.Router();

const { gettingWatchList, addingToWatchList, updatingToWatchList, deletingFromWatchList } = require("../controllers/watchListControllers");
const validateToken = require('../middleware/validateTokenHandler');

route.get('/', validateToken, gettingWatchList);
route.post('/:id', validateToken, addingToWatchList);
route.patch('/:id', validateToken, updatingToWatchList);
route.delete('/:id', validateToken, deletingFromWatchList);

module.exports = route;