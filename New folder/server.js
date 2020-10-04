const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectionDB = require('./config/db.js')

const app = express()



//config .env
require('dotenv').config({
    path : './config/config.env'
})



//body parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//connection to db
connectionDB()


//config for only development
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    //morgan give info about each request
    //cors deal with react
    app.use(morgan('dev'))
}


//load all routes
const authRoute = require('./routes/authRoute.js')




//use route
app.use('/api/', authRoute)






app.use((req, res)=>{
    res.status(404).json({
        sucess: false,
        msg: 'Page not found'
    })
})


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`App lisning on port ${PORT}`)
})