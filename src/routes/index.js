const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    passReqToCallback: true
}))

router.get('/login', (req, res) => {

})

router.post('/login', (req, res) => {

})

router.get('/profile', (req, res) => {
    res.render('profile')
})

module.exports = router