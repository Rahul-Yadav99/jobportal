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

        const existingApplication=await Appl
    } catch (error) {
        console.log(error)
    }
}