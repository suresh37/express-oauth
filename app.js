const express = require('express')
const app = express()
const debug = require('debug')('app')
const chalk = require('chalk')
const path = require('path')
const moragn = require('morgan')
const authRouter = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const mongoose = require('mongoose')
//set up view engine and use static files
app.set('view engine', 'ejs')
app.set('views', 'views')
//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb...')
})
app.use(moragn('tiny'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, 'public', 'css')))
// use routes
app.use('/auth', authRouter)

//home route
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    //console.log('listening on port 3000')
    debug(`listenin on port ${chalk.blue(3000)}`)
})