const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
});

module.exports = (passport) => {
    passport.use(strategy);
};