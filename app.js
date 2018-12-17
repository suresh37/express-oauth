const express = require('express')
const app = express()
const debug = require('debug')('app')
const chalk = require('chalk')
const path = require('path')
const moragn = require('morgan')
const authRouter = require('./routes/auth-routes')
const profileRouter = require('./routes/profile-files')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
//set up view engine and use static files
app.set('view engine', 'ejs')
app.set('views', 'views')
//use cookies
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))
//initialize passport
app.use(passport.initialize())
app.use(passport.session())
//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb...')
})
app.use(moragn('tiny'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, 'public', 'css')))
// use routes
app.use('/auth', authRouter)
app.use('/profile',profileRouter)
//home route
app.get('/', (req, res) => {
    res.render('home',{user: req.user})
})

app.listen(3000, () => {
    //console.log('listening on port 3000')
    debug(`listenin on port ${chalk.blue(3000)}`)
})