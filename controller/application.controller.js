const Application = require("../model/application.model")
const Job = require('../model/job.model')

const applyJobs = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            })
        }
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })

        job.applications.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            message: "Application submitted successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        })

        if (!application) {
            return res.status(404).json({
                message: "No job applied.",
                success: false
            })
        }
        return res.status(200).json({
            application,
            message: "Jobs applied successfully.",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = { applyJobs, getAppliedJob, getApplicants, updateStatus }