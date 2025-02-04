const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated');
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controller/company.controller');

const router = express.Router()

router.route('/register').post(isAuthenticated, registerCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated, updateCompany);

module.exports = router