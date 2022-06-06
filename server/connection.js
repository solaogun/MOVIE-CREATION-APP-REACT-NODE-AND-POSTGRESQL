const {Client} = require('pg')

const client = new Client({
    host: "ec2-34-225-159-178.compute-1.amazonaws.com",
    user: "jnkytizawwkvbc",
    port: 5432,
    password: "7771a4b2c92f4146fadd08ba6cdbc1bd6eb608a8afc2b9a762144358a6766139",
    database: "dfg15ml3tesi9"
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