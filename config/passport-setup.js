const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user,done) => {
    done(null,user.id)
})
passport.deserializeUser((id,done) => {
    console.log(id)
    User.findById(id).then((user) => {
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    //options for strategy 
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
   /* console.log('passport callback function fired')
   console.log(profile) */
   // check if user already exists in our collections
   User.findOne({googleId: profile.id}).then((currentUser) => {
       if(currentUser){
           // already have user
           console.log('user is: '+ currentUser)
           done(null,currentUser)
       }
       else {
           // if not, create user in db
           new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.image.url,
        }).save().then((newUser) => {
            console.log('new User created:'+newUser)
            done(null,newUser)
        })
       }
   })
  
}))