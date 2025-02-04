const express = require('express')
const userRoute = require('./router/user.route.js')
const companyRoute = require('./router/company.route.js')
require('dotenv').config()
require('./db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

// API`s

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})