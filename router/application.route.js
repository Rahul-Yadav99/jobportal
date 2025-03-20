const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated');
const { applyJobs, getAppliedJob, getApplicants, updateStatus } = require('../controller/application.controller.js');


const router = express.Router()

router.route('/apply/:id').get(isAuthenticated, applyJobs)
router.route('/get').get(isAuthenticated, getAppliedJob)
router.route('/:id/applicants').get(isAuthenticated, getApplicants)
router.route('/status/:id/update').post(isAuthenticated, updateStatus)

module.exports = router