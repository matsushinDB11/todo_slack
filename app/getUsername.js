const connection = require('../dbconnect')

const con = connection.createConnect();
exports.getUsername = (id) => {
    con.connect();
    let username;
    con.query(
        'SELECT * FROM users WHERE id=?',
        [id],
        async function await (error, results)  {
            username = results[0].user_name
        }
    );
    con.end();
    return username;
}
