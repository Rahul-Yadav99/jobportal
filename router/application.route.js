const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated');
const { applyJobs, getAppliedJob, getApplicants, updateStatus } = require('../controller/application.controller.js');


const router = express.Router()

router.route('/apply/:id').get(applyJobs)
router.route('/get').get(getAppliedJob)
router.route('/:id/applicants').get(getApplicants)
router.route('/status/:id/update').post(updateStatus)

module.exports = router