const User = require('../serch_userid')

const line = process.argv[2]
// console.log(line);
const res = User.getUserid(line);
res.then((result) => {
    console.log(result);
})
// console.log(res)
