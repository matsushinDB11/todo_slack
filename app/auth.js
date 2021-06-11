const DBpool = require('./dbpool')
const bcypt = require('bcrypt') // パスワードハッシュ化
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./serch_userid')


const pool = DBpool.createPool();
module.exports = (app) =>
{
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // passport.deserializeUser((id, done) => {
    //     pool.getConnection((error, con) => {
    //         con.query(
    //             'SELECT * FROM users WHERE id=?',
    //             [id],
    //             (error, results) => {
    //                 const user_id = results[0].user_id;
    //                 done(null, user_id);
    //         })
    //     })
    // });

    passport.deserializeUser((id, done) => {
        const user_id = User.getUserid(id);
        user_id.then((result) => {
            console.log(result);
            done(null, result)
        })
    });

    passport.use(new LocalStrategy(
        {
            usernameField: "userid",
            passwordField: 'password'
        },
        (userid, password, done) => {
            pool.getConnection((error, con) => {
                con.query(
                    'SELECT * FROM users WHERE user_id = ?',
                    [userid],
                    (error, results) => {
                        if (results.length > 0) {
                            if (password === results[0].password) {
                                return done(null, results[0]);
                            } else {
                                return done(null, false, {message: "Invalid Password"})
                            }
                        } else {
                            return done(null, false, {message: "Invalid User"})
                        }
                    }
                )
            });
        }
    ))
}
