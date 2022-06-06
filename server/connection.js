const {Client} = require('pg')
const fs = require('fs')

const client = new Client({
    // host: "hattie.db.elephantsql.com",
    // user: "jnkytizawwkvbc",
    // port: 5432,
    // password: "rdcAxLPwRJGNLjFY_z0ABugnQryKD-15",
    // database: "mzocvtoh",
    connectionString: "postgres://uqlzmpqlwkebes:bbdb5b0f86207013e4936785ba86e29aa2c8697d0580e25d00570381801c8891@ec2-3-226-163-72.compute-1.amazonaws.com:5432/dhc9m4breqe0t?ssl=true",
    ssl: {
        rejectUnauthorized: false,
        key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
      },
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