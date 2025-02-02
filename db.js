const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB connected...')
}).catch((err)=>{
    console.log(`DB is not connected ${err}`)
})