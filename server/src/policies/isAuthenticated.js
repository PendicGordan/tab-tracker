const passport = require('passport')
const {User} = require('../models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('../config/config')

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, async function (jwtPayload, done) {
        try {
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })

            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa ' + user)

            if (!user) {
                return done(new Error(), false)
            }
            return done(null, user)
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if (err) {
            res.status(403).send({
                error: 'you do not have access to this resource'
            })
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}