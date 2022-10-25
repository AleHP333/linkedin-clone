const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../src/db.js")
const { SECRET_KEY } = process.env;

passport.use(
    new jwtStrategy(
        {
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey: SECRET_KEY
        },
        async (jwt_payload, done) => {
            User.findByPk(jwt_payload.id)
                .then((user) => {
                    if(user){
                        return done(null, user);
                    } else if (err){
                        return done(err, false);
                    } else {
                        return done(null, false); 
                    }
                })
                .catch((err) => {
                    console.log(err)
                    return done(err, false);
            });
        }
    )
);

module.exports = passport;