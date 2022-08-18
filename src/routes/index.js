const express = require('express')
const router = express.Router()
const passport = require('passport')

function isAuthenticated(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/')
}

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
    res.render('login')
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile')
})

module.exports = router