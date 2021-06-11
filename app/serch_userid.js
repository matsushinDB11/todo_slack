const DBpool = require('./dbpool')
const util = require('util')

const pool = DBpool.createPool();
exports.getUserid = async (id) => {
    pool.query_promise = util.promisify(pool.query);
     try {
        const res = await pool.query_promise(
            'SELECT * FROM users WHERE id=?',
            [id]
        )
        pool.end();
        // console.log(res[0].user_id);
        return res[0].user_id;
    }
    catch (e) {
        throw new Error(e);
    }
    
    // await pool.getConnection( async (error, con) => {
    //    return  con.query(
    //         'SELECT * FROM users WHERE id=?',
    //         [id],
    //          (error, results) => {
    //             const user_id = results[0].user_id;
    //             return user_id;
    //         })
    //     con.end();
    // })

}
