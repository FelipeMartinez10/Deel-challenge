const express = require('express');
const asyncHandler = require('express-async-handler');
const { getProfile } = require('./middleware/getProfile');
const contractController = require('./controller/contractController');
const jobController = require('./controller/jobController');
const profileController = require('./controller/profileController');
const adminController = require('./controller/adminController');

const routes = express.Router();

// Contract routes
routes.get('/contracts/:id', getProfile, asyncHandler(contractController.getContract));
routes.get('/contracts', getProfile, asyncHandler(contractController.getContracts));

// Jobs routes
routes.get('/jobs/unpaid', getProfile, asyncHandler(jobController.getUnpaidJobs));
routes.post('/jobs/:jobId/pay', getProfile, asyncHandler(jobController.payJob));

// Client
routes.post('/balances/deposit/:clientId', asyncHandler(profileController.depositMoneyToClient));

// Admin
routes.get('/admin/best-profession', asyncHandler(adminController.getBestProfession));
routes.get('/admin/best-clients', asyncHandler(adminController.getBestClients));

module.exports = routes;
