const express = require('express');
const homeRouter = express.Router();
const passport = require('passport')
const { default: DAuthStrategy } = require('passport-delta-oauth2')

require('dotenv').config({path: '../env/.env'})

const DAUTH_CLIENT_ID = process.env.DAUTH_CLIENT_ID
const DAUTH_CLIENT_SECRET = process.env.DAUTH_CLIENT_SECRET;
const DAUTH_CALLBACK_URL = process.env.DAUTH_CALLBACK_URL;

passport.use(
    new DAuthStrategy({
        clientID: DAUTH_CLIENT_ID,
        clientSecret: DAUTH_CLIENT_SECRET,
        callbackURL: DAUTH_CALLBACK_URL
    },
        (accessToken, refreshToken, profile, cb) => {
            return cb(null, profile)
        }
    ))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


homeRouter.get('/auth', (req, res) => {
    res.redirect(`https://auth.delta.nitt.edu/authorize?client_id=${DAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(DAUTH_CALLBACK_URL)}&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email+openid+profile+user&nonce=bscsbascbadcsbasccabs`)
})

homeRouter.get(
    '/auth/dauth/callback',
    passport.authenticate('dauth', { failureRedirect: '/', scope: 'user' }),
    (req, res) => {
        res.redirect('/form')
    }
)

homeRouter.get('/', (req, res) => {
    res.render('home')
})

// homeRouter.post('/', (req, res) => {
//     res.redirect('/form')
// })


module.exports = homeRouter;