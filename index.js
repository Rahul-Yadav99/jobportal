const express = require('express')
const userRoute = require('./router/user.route.js')
const companyRoute = require('./router/company.route.js')
const jobRoute = require('./router/job.route.js')
const applicationRoute = require('./router/application.route.js')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./db')
const cors = require('cors')

const app = express()

//middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    origin: ['https://jobportal-frontend-seven.vercel.app', 'http://localhost:5173'],
    credentials: true
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

// API's

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)

// app.listen(3000, () => {
//     console.log('Server is running on port 3000')
// })

 app.listen('https://jobportal-two-coral.vercel.app')