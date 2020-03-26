/* eslint-disable no-undef */

const express = require('express');
const routes = express.Router();
const ongsController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongsController.list);

routes.post('/ongs', ongsController.create);

routes.get('/incidents', incidentController.list);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileController.list);

module.exports = routes;