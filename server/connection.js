const {Client} = require('pg')

const client = new Client({
    host: "hattie.db.elephantsql.com",
    user: "jnkytizawwkvbc",
    port: 5432,
    password: "rdcAxLPwRJGNLjFY_z0ABugnQryKD-15",
    database: "mzocvtoh",
    // host: "localhost",
    // user: "solaogun",
    // port: 5433,
    // password: "Saidat",
    // database: "movie"
})

client.connect()

// client.query(`Select * from users`, (err, res) =>{
//     if(!err){
//         console.log(res.rows)
//     }else{
//         console.log(err.message)
//     }
//     client.end
// })

module.exports = client