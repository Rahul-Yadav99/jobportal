const Job = require("../model/job.model")

const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body
        const userId = req.id

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || companyId) {
            return res.status(400).json({
                message: "Please fill in all the required fields.",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(200).json({
            message: "Job posted successfully.",
            job,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query)

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            })
        }

        return res.status(200).json({
            message: "Jobs retrieved successfully.",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { postJob, getAllJobs }