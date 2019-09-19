
const router = require('express').Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.VUE_APP_FB_CLIENT_ID || '495679290994821',
    clientSecret: process.env.VUE_APP_FB_CLIENT_SECRET || '9cb4a675db2cfdc381551c803cbe3e5a',
    callbackURL: `${process.env.VUE_APP_BASE_API_URI}/auth/facebook/callback`,
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'first_name', 'last_name', 'middle_name']
},
    function (facebook_access_token, refreshToken, profile, done) {
        done(null, { profile, facebook_access_token });
    }
));

passport.use('google', new GoogleStrategy({
    clientID: process.env.VUE_APP_GOOGLE_CLIENT_ID || '1024945034700-v72om5uob78iold6ujgbin6dsfiv0ft6.apps.googleusercontent.com',
    clientSecret: process.env.VUE_APP_GOOGLE_CLIENT_SECRET || 'gK4q_ckHtGArzz4U2Z5k-xTI',
    callbackURL: `${process.env.VUE_APP_BASE_API_URI}/auth/google/callback`
},
    function (google_access_token, refreshToken, profile, done) {
        console.log('accessToken :', google_access_token);
        console.log('refreshToken :', refreshToken);
        console.log('profile :', profile);
        done(null, { profile, google_access_token });
    }
));




router.route('/facebook')
    .get(passport.authenticate('facebook', { scope: ["email"] }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', { session: false }), (req, res) => {
        console.log('redirect to : ', process.env.VUE_APP_HOME_URI);
        res.redirect(`${process.env.VUE_APP_HOME_URI}/#/auth?oauth=facebook&data=${new Buffer(JSON.stringify(req.user)).toString('base64')}`)
    });

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.route('/google/callback')
    .get(passport.authenticate('google', { session: false }), (req, res) => {
        console.log('redirect to : ', process.env.VUE_APP_HOME_URI);
        res.redirect(`${process.env.VUE_APP_HOME_URI}/#/auth?oauth=google&data=${new Buffer(JSON.stringify(req.user)).toString('base64')}`)
    });

module.exports = router;

