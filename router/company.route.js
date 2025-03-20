const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated');
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controller/company.controller');

const router = express.Router()

router.route('/register').post(registerCompany);
router.route('/get').get(getCompany);
router.route('/get/:id').get(getCompanyById);
router.route('/update/:id').put(updateCompany);

module.exports = router