const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const express = require('express');
const router = express.Router();
const connection = require('../dbconnect')

const con = connection.createConnect();

/* GET home page. */
router.get('/', function (req, res, next) {
    const errors = [];
    res.render('signup', { errors: errors });
});

router.post('/',
    (req, res, next) => {
        console.log('入力値の空チェック');
        const username = req.body.user;
        const password = req.body.pass;
        const errors = [];

        if (username === '') {
            errors.push('ユーザー名が空です');
        }

        if (password === '') {
            errors.push('パスワードが空です');
        }

        if (errors.length > 0) {
            res.render('signup', { errors: errors });
        } else {
            next();
        }
    },
    (req, res, next) => {
        console.log('ユーザ名の重複チェック');
        const username = req.body.user;
        const errors = [];
        con.query(
            'SELECT * FROM users WHERE user_id = ?',
            [username],
            (error, results) => {
                if (results.length > 0) {
                    errors.push('ユーザー登録に失敗しました');
                    res.render('signup', { errors: errors });
                } else {
                    next();
                }
            }
        );
        // con.end();
    },

    (req, res, next) => {
        const userId = req.body.user;
        const password = req.body.pass;
        // con.connect();
        con.query(
            'INSERT INTO users (user_id, password) VALUES(?, ?)',
            [userId, password],
            function (error, results, fields) {
                if (error) throw error;
                req.login(userId, (err) => {
                    if (err) {return err}
                    return res.redirect('/');
                })
            });
        con.query(
            'INSERT INTO contents (user_id, text) VALUES(?,?)',
            [userId, '初めまして'], (error, results) => {
                if (error) throw error;
                // res.redirect('/');
            });
        // con.end();
    },
);



module.exports = router;
