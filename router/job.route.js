const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated.js');
const { postJob, getAllJobs, getAdminJobs, getJobById } = require('../controller/job.controller');

const router = express.Router()

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs);
router.route('/get/:id').get(isAuthenticated, getJobById);


module.exports = router