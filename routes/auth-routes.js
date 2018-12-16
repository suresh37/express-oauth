const router = require('express').Router()
const passport = require('passport')
//auth router
router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
//auth logout'
router.route('/logout')
    .get((req, res) => {
        res.send('logging out')
    })

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'),
    (req, res) => {
        res.send('u reached callback uri')
    })

module.exports = router