const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated');
const { postJob, getAllJobs, getAdminJobs, getJobById } = require('../controller/job.controller');

const router = express.Router()

router.route('/post').post(postJob);
router.route('/get').get(getAllJobs);
router.route('/getadminjobs').get(getAdminJobs);
router.route('/get/:id').get(getJobById);


module.exports = router