const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        const newUser = new User();
        newUser.username = username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptedPassword(password);
        await newUser.save();
        done(null, newUser);
    }
))