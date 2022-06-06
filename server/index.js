const client = require("./connection");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv')
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const commentRoute = require("./routes/comment")
const path = require('path')


app.use(bodyParser.json());
app.use(cors());

dotenv.config();

app.listen(3300, () => {
  console.log("First server using postgres is up");
});

app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/users", (req, res) => {
  console.log("React to the world");
  client.query("SELECT * FROM users", (err, result) => {
    console.log(err);
    // res.status(200).json({msg:"hello"})
    if (!err) {
      res.send(result.rows);
    }
  });
  // client.end()
  console.log("issue");
});

// app.post('/users', (req, res)=> {
//     const user = req.body;
//     let insertQuery = `insert into users(username, email, password)
//                        values('${user.username}', '${user.email}', '${user.password}')`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Insertion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })

// app.listen(3300, ()=>{
//     console.log("First server using postgres is up")
// })
// client.connect()
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/comments", commentRoute)
