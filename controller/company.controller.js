const Company = require("../model/company.model")

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                status: false
            })
        }

        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(400).json({
                message: "Company already exists.",
                status: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(200).json({
            message: "Company created successfully.",
            company,
            status: true,
        })
    } catch (error) {
        console.log(error);
    }
}

const getCompany = async (req, res) => {
    try {
        const userId = req.id
        const company = await Company.find({ userId: userId })

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                status: false
            })
        }

        return res.status(200).json({
            message: "Company found.",
            company,
            status: true
        })
    } catch (error) {
        console.log(error)
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                status: false
            })
        }

        return res.status(200).json({
            message: "Company found.",
            company,
            status: true
        })
    } catch (error) {
        console.log(error)
    }
}

const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.body //cloudnary

        const updateData = { name, description, website, location }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                status: false
            })
        }

        return res.status(200).json({
            message: "Company updated.",
            // company,
            status: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerCompany, getCompany, getCompanyById, updateCompany }  